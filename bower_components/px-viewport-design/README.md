# Viewport

Default viewport parameters for Predix UI components.

## Upstream dependency

The Viewport module is an upstream dependency in this meta kit:

* [px-starter-kit-design](https://github.com/PredixDev/px-starter-kit-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save px-viewport-design

Once installed, `@import` into your project's Sass file in its **Base** layer:

    @import "px-viewport-design/_base.viewport.scss";

## Usage

.viewport is the primary class applied to div containing app nav and content (body > div.viewport)

The following variables are available for use in the module:

    $desk-wide-width
    $desk-wide-max-width
    $viewport-margin


#### $desk-wide-width

**Type**: Set value in rems, percentage, 'auto', 'initial', or 'inherit'
<br/>
**Default**: 100%
<br/>
**Description:** Set this to the desired width of the "page" element, `div.viewport`.
Will be inserted as the widest breakpoint for the responsive mixin.
This variable is overridden in px-theme.
<br/><br/>


#### $desk-wide-max-width

**Type**: Set value in rems, percentage, 'auto', 'initial', or 'inherit'
<br/>
**Default**: 80rem
<br/>
**Description:** Set this to the desired value of widest possible viewport width.
Will be inserted as the widest breakpoint for the responsive mixin.
This variable is overridden in px-theme.
<br/><br/>


#### $viewport-margin

**Type**: Set value in rems, percentage, 'auto', 'inherit'
<br/>
**Default**: auto
<br/>
**Description:** Set this to the desired value of margin-left and margin-right for viewport.
This variable is overridden in px-theme.
<br/><br/>

view the full API [here](http://predixdev.github.io/px-viewport-design/sassdoc/)
