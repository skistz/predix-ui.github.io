# Widths design

The Predix UI Widths module is a series of width helper classes that you can use to size things like grid systems.

## Dependencies

Predix UI's Widths module depends on two other Px modules:

* [px-functions-design](https://github.com/PredixDev/px-functions-design)
* [px-widths-tools-design](https://github.com/PredixDev/px-widths-tools-design)

## Installation

Install using Bower:

    bower install --save px-widths-design

Once installed, `@import` into your project's Sass file in its **Trumps** layer:

    @import "px-widths-design/_trumps.widths.scss";

## Usage

By default the widths module will create wholes, halves, thirds, quarters, and sixths nomenclatures for width percentage classes.

## Options

Depending on your choice of format, these classes are available by default (All widths are expressed in percentages, rounded to seven decimal points):

Whole:

* `u-1/1|u-1-of-1`

Halves:

* `u-1/2|u-1-of-2`

Thirds:

* `u-1/3|u-1-of-3`
* `u-2/3|u-2-of-3`

Quarters:

* `u-1/4|u-1-of-4`
* `u-2/4|u-2-of-4`
* `u-3/4|u-3-of-4`

Sixths:

* `u-1/6|u-1-of-6`
* `u-2/6|u-2-of-6`
* `u-3/6|u-3-of-6`
* `u-4/6|u-4-of-6`
* `u-5/6|u-5-of-6`

view the full API [here](http://predixdev.github.io/px-widths-design/sassdoc/)
