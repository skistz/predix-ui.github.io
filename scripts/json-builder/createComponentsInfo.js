/*
 * Run in a directory with a bunch of subdirectories.
 *
 * Example: Get all subdirectories with names ending in '-design'
 *
 * ```
 * const subdirs = getDirectories(__dirname).filter(isMatch.bind(null, /\-design$/));
 * ```
 *
 * Example: Get all subdirectories that have any subfiles named *.es6.js
 *
 * ```
 * const hasES6File = source => getFiles(source).filter(isMatch.bind(null, /\.es6\.js$/)).length > 0;
 * const dirsWithES6 = getDirectories(__dirname).filter(hasES6File);
 * ```
 *
 * Thanks to https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
 * for many of the methods below.
 */

const fs = require('fs');
const path = require('path');

const isDirectory = source => fs.lstatSync(source).isDirectory();
const isFile = source => fs.lstatSync(source).isFile();
const isMatch = (regex, source) => regex.test(source);
const getDirectories = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const getFiles = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isFile);


//FINE DEMO FILE
const MATCHES_PX_RE = /\/px\-[a-z\-]+$/;
const MATCHES_PX_DESIGN_RE = /\-design$/;
const FIND_PX_END_RE = /\/(px\-[a-z\-]+)$/;
const componentsToExclude = [
  "px-code-editor",
  "px-datetime-common",
  "px-demo",
  "px-number-formatter",
  "px-sass-doc",
  "px-vis-demos"
];

//If the component has a file in the demo folder that is the
//component's name plus -demo return that other wise return index.html
function returnDemoFile(listDemoFiles, componentName){
  var demoFileName;
  listDemoFiles.forEach(function (individualDemoFilePath) {
    var hasDemo = individualDemoFilePath.indexOf(componentName + "-demo.html") > -1;
    if (hasDemo) {
      demoFileName = componentName + "-demo.html";
    }
  });
  return demoFileName || "index.html";
}

// PARCE FILE
var FIND_COMPONENT_DESCRIPTION_RE = /\<px-demo-header[\S\s]*description\=[\'\"]([\S\s]*)[\'\"][\S\s]*\>\s*\<\/px-demo-header\>/;
function collectDescription(demoFileToRead){
  var content = fs.readFileSync(demoFileToRead, "utf8");
  const componentDescription = content.match(FIND_COMPONENT_DESCRIPTION_RE);
  if (componentDescription === null) { return ""; }
  else {
    return componentDescription[1];
  }
}

// CREATE tile-data.json
function convertName(componentNameDashes){
  var convertedName = componentNameDashes.slice(3); //remove 'px-'
      convertedName = convertedName.replace(/\-/g,' '); //replace dashes with a spce
      convertedName = convertedName.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}); //convert to title case
  return convertedName;
}

function createComponentObj(componentNameSpace, componentNameDashes, descriptionCondensed){
  let componentInfoObj = {};
      componentInfoObj.title = componentNameSpace;
      componentInfoObj.description = descriptionCondensed;
      componentInfoObj.imageUrl = "../img/component-gallery/" + componentNameDashes.slice(3);
      componentInfoObj.imageAlt = componentNameSpace + " thumbnail";
  return componentInfoObj;
}




// MAIN FUNCTION
exports = module.exports = function (bowerPath) {
  //grab all the file paths of the component only
  console.log(bowerPath);

  const subdirs = getDirectories(bowerPath).filter(function (filePath) {
    if (MATCHES_PX_RE.test(filePath) && !MATCHES_PX_DESIGN_RE.test(filePath)) { return true; }
  });

  // LOOP OVER EACH FILE
  const allComponentsInfoObj = [];

  subdirs.forEach(function (arrayItem) {
    const demoFilePath = path.join(arrayItem, "demo");
    const componentNameDashes = arrayItem.match(FIND_PX_END_RE)[1];
    const componentNameSpace = convertName(componentNameDashes);

    if (fs.existsSync(demoFilePath)) {
      const listDemoFiles = getFiles(demoFilePath);
      const demoFileName = returnDemoFile(listDemoFiles, componentNameDashes);
      const demoFileToRead = path.join(demoFilePath, demoFileName);
      const description = collectDescription(demoFileToRead);
      let descriptionCondensed = description.replace(/\n/g, '').replace(/\s\s/g, '').replace(/\t/g, ' '); //remove line breaks, extra spaces, and tabs

      let componentInfoObj = createComponentObj(componentNameSpace, componentNameDashes, descriptionCondensed);
      if (!componentsToExclude.includes(componentNameDashes)) {
        allComponentsInfoObj.push(componentInfoObj);
      } else {
        console.log("excluding " + componentNameDashes);
      }
    }
  });

  return allComponentsInfoObj;
};
