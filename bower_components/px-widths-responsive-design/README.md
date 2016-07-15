# Widths Responsive

The Predix UI Widths Responsive module is an extension of the default [px-widths-design](https://github.com/PredixDev/px-widths-design) module and provides breakpoint-based classes for widths on elements. This module is a fork of inuitcss' [widths-responsive](https://github.com/inuitcss/trumps.widths-responsive) module.

The Widths Responsive module loops through the breakpoints defined in inuitcss' [settings.responsive](https://github.com/inuitcss/settings.responsive) to generate prefixed breakpoint-based classes. If you are using inuitcss’ default breakpoints, you will be given classes like `u-1/4-lap-and-up`, or `u-1-of-2-desk`, etc.

Widths Responsive will inherit the same settings used for the Widths module (i.e. namespaces and fraction vs. spoken-word format).

Based on the breakpoints defined in the `$breakpoints` Sass list, then widths determined by classes in your markup will be triggered.

For example, a `$breakpoint` named `desk` which defines a media-query for viewports wider than 1024 pixels, the class `.u-1/2-desk` would apply a width of 50% on an element with a viewport above 1024 pixels. At narrower viewports `.u-1/2-desk` has no effect.



## Dependencies

Px's Widths Responsive module depends on one other Px and one other inuitcss modules:

* [tools.responsive](https://github.com/inuitcss/tools.responsive)
* [px-widths-design](https://github.com/PredixDev/px-widths-design)

## Upstream dependency

The Widths Responsive module is also an upstream dependency in this meta kit:

* [px-starter-kit-design](https://github.com/PredixDev/px-starter-kit-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save px-widths-responsive-design

Once installed, `@import` into your project's Sass file in its **Trumps layer**:

    @import "px-spacing-responsive-design/_trumps.widths-responsive.scss";

## Options

For each "breakpoint" set in inuitcss' [settings.responsive](https://github.com/inuitcss/settings.responsive) `$breakpoint` Sass list, the classes below will be appended i.e. `[breakpoint-name]-classname`. Width dimensions are set in Px's [Widths](https://github.com/PredixDev/px-widths-design) module.

All widths are expressed in percentages, rounded to seven decimal points.

Whole:

* `u-1/1-*|u-1-of-1-*`

Halves:

* `u-1/2-*|u-1-of-1-*`

Thirds:

* `u-1/3-*|u-1-of-3-*`
* `u-2/3-*|u-2-of-3-*`

Quarters:

* `u-1/4-*|u-1-of-4-*`
* `u-2/4-*|u-2-of-4-*`
* `u-3/4-*|u-3-of-4-*`

Fifths:

* `u-1/6-*|u-1-of-6-*`
* `u-2/6-*|u-2-of-6-*`
* `u-3/6-*|u-3-of-6-*`
* `u-4/6-*|u-4-of-6-*`
* `u-5/6-*|u-5-of-6-*`

Please view the full API [here](http://predixdev.github.io/px-widths-responsive-design/sassdoc/)
