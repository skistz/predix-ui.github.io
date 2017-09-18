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
const subComponentsArray = [
  "px-card-behavior",
  "px-dashboard",
  "px-deck",
  "px-context-browser-trigger",
  "px-vis-area-svg",
  "px-vis-axis",
  "px-vis-axis-interaction-space",
  "px-vis-bar-svg",
  "px-vis-brush",
  "px-vis-canvas",
  "px-vis-chart-navigator",
  "px-vis-clip-path",
  "px-vis-clip-path-complex-area",
  "px-vis-cursor",
  "px-vis-cursor-line",
  "px-vis-data-converter",
  "px-vis-dynamic-menu",
  "px-vis-event",
  "px-vis-gridlines",
  "px-vis-highlight-line-canvas",
  "px-vis-highlight-line",
  "px-vis-highlight-point-canvas",
  "px-vis-highlight-point",
  "px-vis-interactive-axis",
  "px-vis-interaction-space",
  "px-vis-line-canvas",
  "px-vis-line-svg",
  "px-vis-multi-axis",
  "px-vis-multi-scale",
  "px-vis-pie",
  "px-vis-radar-grid",
  "px-vis-radial-gridlines",
  "px-vis-radial-scale",
  "px-vis-register",
  "px-vis-scale",
  "px-vis-scatter",
  "px-vis-scatter-canvas",
  "px-vis-striping",
  "px-vis-svg",
  "px-vis-svg-canvas",
  "px-vis-threshold",
  "px-vis-toolbar",
  "px-vis-tooltip",
  "px-data-table-column",
  "px-data-table-highlight",
  "px-kpi-list",
  "px-map-tile-layer",
  "px-map-tile-layer-bing",
  "px-map-layer-geojson",
  "px-map-layer-group",
  "px-map-control-locate",
  "px-map-control-scale",
  "px-map-control-zoom",
  "px-map-marker-locate",
  "px-map-marker-static",
  "px-map-marker-symbol",
  "px-map-marker-group",
  "px-map-popup-info",
  "px-map-popup-data",
  "px-table-view-sortable-list",
  "px-table-row",
  "px-table-row-action-button",
  "px-tree-node"
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

  // filter out design repos and sub components
  const filteredComponentObjs = componentDataFile.filter(function (componentObj) {
    if (!MATCHES_PX_DESIGN_RE.test(componentObj.componentName) && !subComponentsArray.includes(componentObj.componentName)) { return true; }
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
