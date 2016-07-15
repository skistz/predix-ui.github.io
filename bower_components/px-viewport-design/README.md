# Viewport

Default viewport parameters for Predix Experience.



## Upstream dependency

The Viewport module is an upstream dependency in this meta kit:

* [px-starter-kit-design](https://github.com/PredixDev/px-starter-kit-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save https://github.com/PredixDev/px-viewport-design.git

Once installed, `@import` into your project's Sass file in its Base layer:

    @import "px-viewport-design/_base.viewport.scss";

## Usage

The following variables are available for use in the module:

    $desk-wide-width

This should be the widest (in `rem`'s you wish the overall "page" to be, and will be added as the widest breakpoint for responsive mixin).
