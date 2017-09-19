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
const MATCHES_PX_RE = /px\-[a-z\-]+/;
const MATCHES_PX_DESIGN_RE = /\-design$/;
const FIND_PX_END_RE = /\/(px\-[a-z\-]+)$/;
const ExcludedComponentsArray = [
  "px-app-route",
  "px-number-formatter"
];


// PARSE Description out of demo files
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


function createComponentObj(componentNameSpace, componentNameDashes, componentEntryPoint, descriptionCondensed){
  let componentInfoObj = {};
      componentInfoObj.title = componentNameSpace;
      componentInfoObj.description = descriptionCondensed;
      componentInfoObj.imageUrl = "../img/component-gallery/" + componentNameDashes.slice(3);
      componentInfoObj.imageAlt = componentNameSpace + " thumbnail";
      componentInfoObj.entryPoint = componentEntryPoint;
  return componentInfoObj;
}


// MAIN FUNCTION
exports = module.exports = function (componentDataFile) {

  // filter out subcomponents, excluded components, and design components
  const filteredComponentObjs = componentDataFile.filter(function (componentObj) {
    if (!componentObj.subcomponent && !ExcludedComponentsArray.includes(componentObj.componentName) && !MATCHES_PX_DESIGN_RE.test(componentObj.componentName)) { return true; }
  });

  // LOOP OVER EACH FILE
  const allComponentsInfoObj = [];

  filteredComponentObjs.forEach(function (filteredObjItem) {
    const demoFilePath = filteredObjItem.entryPoint;
    const nameDashes = filteredObjItem.componentName;
    const nameSpace = filteredObjItem.label;
    const entryPoint = filteredObjItem.entryPoint;

    const demoFileToRead = path.resolve(__dirname + '/../../' + demoFilePath);
    const description = collectDescription(demoFileToRead);
    let descriptionCondensed = description.replace(/\n/g, '').replace(/\s\s/g, '').replace(/\t/g, ' '); //remove line breaks, extra spaces, and tabs

    let componentInfoObj = createComponentObj(nameSpace, nameDashes, entryPoint, descriptionCondensed);
    allComponentsInfoObj.push(componentInfoObj);
  });

  return allComponentsInfoObj;
};
