---
title: Vis Migration Guide
moduleName: view-develop-migrate-vis
pathToRoot: ../../../
layout: default
---

This guide addresses the following charts/components:

Component | latest version
 ------- | -----
 px-vis-timeseries | v3
 px-vis-xy-chart | v3
 px-vis-parallel-coordinates | v3
 px-vis-polar | v3
 px-vis-radar | v3
 px-vis-pie-chart | v2
 px-vis-spark | v2
 px-simple-area | v2

--------------------------------------------------------------------------------

# Upgrading
Upgrading the charts should be mostly seamless. The big items are colors and icons, but these highly depend on your configuration.
## Colors:
* If you manually specify colors in your `seriesConfig` and use PX colors, you should update those `seriesConfigs` to use new colors
* If you depend on reading `dataVisColors` and `seriesColorOrder` to find out what colors the chart is using, you'll have to switch over to using `seriesColorList` instead. `dataVisColors` and `seriesColorOrder` have been removed.
* If you assign `seriesColorOrder` and `dataVisColors` on your chart, you'll now have to assign `seriesColorList` instead
* If you assign chart colors via CSS variables, there is no change

## Icons
* Everywhere that was a font awesome icon now has to be upgraded
* All font awesome icons were replaced with custom px icons. The list of available icons can be found [here](https://www.predix-ui.com/#/components/px-icon-set/)
* For Events, you just have to update the name of the icon being used and the "type"
* For Toolbar, if you provide custom toolbar options, you'll have to upgrade the "icon" and optional "cursorIcon" to be the name of the new px icon
* For Dynamic menu, similar to toolbar, upgrade the name

Note that default colors for the charts are blacks and greys. If you see this, you didnt apply a theme to your page.

--------------------------------------------------------------------------------

# List of breaking changes and what this means:

## Colors
* All components load with default black and white colors unless a theme is loaded. The theme colors are loaded via CSS variables.
* dataVisColors and seriesColorOrder properties have been removed and replaced with seriesColorList.
  * seriesColorList is just an array of rgb colors rather than names and needed a lookup as before with dataVisColors and seriesColorOrder
  * If you need to look up what colors as being used by default, you can:
    1) look at the generated seriesColorOrder property of the chart. Once created, it fires the event: px-data-vis-colors-applied
    2) Read the CSS variables: ex: this.getComputedStyleValue('--px-vis-series-color-0');
* seriesColorList is generated from the CSS variables in the theme
  * If you want custom colors for the data series, you can:
    1) Assign your own colors to the CSS variables
    2) Pass in a seriesColorOrder property to the chart
    3) Pass in a custom color into the seriesConfig (for every series )

## Icons
### General
* px-polymer-font-awesome has been removed as a repo from Predix UI and replaced with px-icon-set
  * FontAwesome is no longer natively supported in any Predix UI component
* px-icon-set is a type of iron-icon-set, so you can read their docs to better understand what is happening
* To load an icon-set, jsut add the import to your app:
  * Ex: `<link rel="import" href="../px-icon-set/px-icon-set.html"/>`is a shortcut to load ALL the px icon sets. If you only want one, just load that individual set. Ex: `<link rel="import" href="../px-icon-set/px-icon-features.html"/>`
* the px-icon-set repo supplies a variety of icon-sets and a px-icon component to display the icon
* List of all available icons is [here](https://www.predix-ui.com/#/components/px-icon-set/)

### Vis specific
* Changed over to px-icon-set for px-vis-events, px-vis-toolbar, and px-vis-dynamic-menu
* Events:
  * Images still supported
  * Font Awesome icons no longer supported.
  * Unicode values no longer supported
  * Icons can only be loaded icon-icon-sets which use SVG.
  * Icon name must include the set prefix: ex: 'px-utl:information'
* Dynamic menu and Toolbar:
  * Must be icons use px-icon, which wraps iron-icon.
  * Must be value icon types for px-icon or iron-icon.
  * Icon name must include the set prefix
* The demo has been updated, so you can see the updated configs for events, toolbar, and dynamic menus

## Canvas Rendering
* There is a new internal renderer for canvas which is much smoother, but looks different
  * renderer automatically adjust the number of points per frame rendered. This number will be adjusted every frame based on how long previous frame took, which should make the rendering smooth on different browsers and different hardware
  * It will now render "series per series" rather than a batch of several series for each frame, i.e it won't move to rendering the second series until the first series has been completely rendered
* a few properties are available to adjust renderer behavior, see API for more info
* removed properties for controlling number of points rendered in progressive rendering:
  * noCanvasProgressiveRendering
  * progressiveRenderingPointsPerFrame
  * progressiveRenderingMinimumFrames
* removed progressive rendering events for line scatter and canvas scatter:
  * px-vis-scatter-progressive-rendering-started
  * px-vis-scatter-canvas-progressive-batch
  * px-vis-scatter-progressive-rendering-ended
  * px-vis-scatter-canvas-rendering-ended
  * px-vis-line-progressive-rendering-started
  * px-vis-line-canvas-progressive-batch
  * px-vis-line-progressive-rendering-ended
  * px-vis-line-canvas-rendering-ended
* new events for canvas rendering:
  * px-vis-chart-canvas-rendering-started
  * px-vis-chart-canvas-rendering-ended

## Misc
* removed redrawElement function from highlightPoint and highlightLine
* Changed inert property on register to inertRegister so as to not conflict with w3c spec
* Removed canvasContextTop
  * changed to dynamic canvas creation
  * non-data series canvases can be created in a canvasLayers property via a canvasLayersConfig property
