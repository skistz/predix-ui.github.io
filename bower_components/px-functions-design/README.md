# Functions

The Predix UI Functions module—like the Mixins module—contains a few Sass functions that are **required** for using virtually all Predix UI and inuitcss modules.

## Dependency

Predix UI's Functions module depends on one other inuitcss module:

* [inuit-functions](https://github.com/inuitcss/tools.functions)

## Installation

Install this module and its dependency using bower:

    bower install --save px-functions-design

Once installed, `@import` into your project's Sass file in its Tools layer:

    @import "px-functions-design/_tools.functions.scss";

## Usage

The following Sass functions are provided:

* `calculateRem($size)`: Convert a pixel into a rem
* `quarter|halve|double|quadruple|third|triple($inuit-number)`: Quarter, halve, third, double, triple, and quadruple numbers, returning rounded integers

view the full API [here](http://predixdev.github.io/px-functions-design/sassdoc/)
