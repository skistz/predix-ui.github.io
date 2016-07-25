# Layout

The Predix UI Layout module defines the "grid," or more accurately the layout engine, for Predix UI. This module is a fork of the [inuitcss Layout module](https://github.com/inuitcss/objects.layout). Main features of the grid are its inherent fluidity, and responsiveness which is based on each `.layout__item` shrinking to a minimum size rather then having their size based on the viewport of the browser.

## Dependency

Predix UI's Layout module depends on one other Px module:

* [px-defaults-design](https://github.com/PredixDev/px-defaults-design)

## Installation

Install this module and its dependency using bower:

    bower install --save  px-layout-design

Once installed, `@import` into your project's Sass file in its Base layer:

    @import "px-layout-design/_objects.layout.scss";

## Usage

These flags are available and, if needed, should be set to `true` prior to importing the module:

    $inuit-enable-layout--tiny
    $inuit-enable-layout--small
    $inuit-enable-layout--large
    $inuit-enable-layout--huge
    $inuit-enable-layout--flush
    $inuit-enable-layout--rev
    $inuit-enable-layout--middle
    $inuit-enable-layout--bottom
    $inuit-enable-layout--full
    $inuit-enable-layout--right
    $inuit-enable-layout--center
    $inuit-enable-layout__item--full
    $inuit-enable-layout__item--center
    $inuit-enable-layout__item--bottom

The following variable is available for use in the module:

    $inuit-layout-min-width

Basic usage of objects.layout requires `.layout__item[s]` inside of a parent container with a `.layout` class. Each `.layout` should contain either 1, 2, 3, 4, or 6 `.layout__item` elements. Each `.layout__item` will be distributed evenly along the x-axis. To override this behavior, then assign a width to a `.layout__item` with a width class i.e. `.u-1/3` or `.u-1/4`.

In this example, each `.layout__item` would take up a third of the width of the `.layout` parent:

    <div class=layout>
      <div class=layout__item>
      </div>
      <div class=layout__item>
      </div>
      <div class=layout__item>
      </div>
    </div>

In this example, the initial `.layout__item` will take up one half of the width the `.layout` parent; the remaining `.layout__item`'s will take up a quarter of the width of the parent `.layout`.

    <div class=layout>
      <div class="layout__item u-1/2">
      </div>
      <div class=layout__item>
      </div>
      <div class=layout__item>
      </div>
    </div>

view the full API [here](http://predixdev.github.io/px-layout-design/)
