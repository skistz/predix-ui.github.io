# Spacing Responsive

The Predix UI Spacing Responsive module is an extension of the default [px-spacing-design](https://github.com/PredixDev/px-spacing-design) module and provides breakpoint-based classes for nudging margins and paddings around responsively. This module is a fork of inuitcss' [spacing-responsive](https://github.com/inuitcss/trumps.spacing-responsive) module.

The Spacing Responsive module loops through the breakpoints defined in inuitcss' [settings.responsive](https://github.com/inuitcss/settings.responsive) module to generate prefixed breakpoint-based classes. If you are using inuitcss’ default breakpoints, you will be given classes like `u-lap-and-up-m0`, or `u-desk-pt++`, etc.

Based on the breakpoints defined in the `$breakpoints` Sass list, then the margins or padding determined by classes in your markup will be triggered.

For example, a `$breakpoint` named `desk` which defines a media-query for viewports wider than 1024 pixels, the class `.u-desk-m0` would zero out all margins with a viewport above 1024 pixels. At narrower viewports `.u-desk-m0` has no effect.

## Dependencies

Predix UI's Spacing Responsive module depends on one other Px module and two other inuitcss modules:

* [settings.responsive](https://github.com/inuitcss/settings.responsive)
* [tools.responsive](https://github.com/inuitcss/tools.responsive)
* [px-spacing-design](https://github.com/PredixDev/px-spacing-design)

## Upstream dependency

The Spacing Responsive module is also an upstream dependency in this meta kit:

* [px-starter-kit-design](https://github.com/PredixDev/px-starter-kit-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save px-spacing-responsive-design

Once installed, `@import` into your project's Sass file in its **Trumps** layer:

    @import "px-spacing-responsive-design/_trumps.spacing-responsive.scss";

## Usage

These flags are available and, if needed, should be set to `true` prior to importing the module:

    $inuit-enable-responsive-margins
    $inuit-enable-responsive-margins--tiny
    $inuit-enable-responsive-margins--small
    $inuit-enable-responsive-margins--large
    $inuit-enable-responsive-margins--huge

    $inuit-enable-responsive-margins--negative
    $inuit-enable-responsive-margins--negative-tiny
    $inuit-enable-responsive-margins--negative-small
    $inuit-enable-responsive-margins--negative-large
    $inuit-enable-responsive-margins--negative-huge

    $inuit-enable-responsive-margins--none

    $inuit-enable-responsive-margins--rtl

    $inuit-enable-responsive-paddings
    $inuit-enable-responsive-paddings--tiny
    $inuit-enable-responsive-paddings--small
    $inuit-enable-responsive-paddings--large
    $inuit-enable-responsive-paddings--huge

    $inuit-enable-responsive-paddings--none

    $inuit-enable-responsive-paddings--rtl

The conventions used in the classes in the Spacing Responsive module are as follows:

    .u-[breakpoint]-[negative][type][direction][size] {}

## Options

For each "breakpoint" set in inuitcss' [settings.responsive](https://github.com/inuitcss/settings.responsive) `$breakpoint` Sass list, the classes below will be appended i.e. `u-[breakpoint-name]-classname`. Margin dimensions are set in Px's [Spacing](https://github.com/PredixDev/px-spacing-design) module.

These classes are available if the following variable flags are set to `true`:

`$inuit-enable-responsive-margins`:

* `.u-*-m`: add default margins to all sides
* `.u-*-mt`: add default margin top
* `.u-*-mr`: add default margin right
* `.u-*-mb`: add default margin bottom
* `.u-*-ml`: add default margin left
* `.u-*-mh`: add default margins right and left
* `.u-*-mv`: add default margins top and bottom

`$inuit-enable-responsive-margins--tiny`:

* `.u-*-m--`: add tiny margins to all sides
* `.u-*-mt--`: add tiny margin top
* `.u-*-mr--`: add tiny margin right
* `.u-*-mb--`: add tiny margin bottom
* `.u-*-ml--`: add tiny margin left
* `.u-*-mh--`: add tiny margins right and left
* `.u-*-mv--`: add tiny margins top and bottom

`$inuit-enable-responsive-margins--small`:

* `.u-*-m-`: add small margins to all sides
* `.u-*-mt-`: add small margin top
* `.u-*-mr-`: add small margin right
* `.u-*-mb-`: add small margin bottom
* `.u-*-ml-`: add small margin left
* `.u-*-mh-`: add small margins right and left
* `.u-*-mv-`: add small margins top and bottom

`$inuit-enable-responsive-margins--large`:

* `.u-*-m+`: add large margins to all sides
* `.u-*-mt+`: add large margin top
* `.u-*-mr+`: add large margin right
* `.u-*-mb+`: add large margin bottom
* `.u-*-ml+`: add large margin left
* `.u-*-mh+`: add large margins right and left
* `.u-*-mv+`: add large margins top and bottom

`$inuit-enable-responsive-margins--huge`:

* `.u-*-m++`: add huge margins to all sides
* `.u-*-mt++`: add huge margin top
* `.u-*-mr++`: add huge margin right
* `.u-*-mb++`: add huge margin bottom
* `.u-*-ml++`: add huge margin left
* `.u-*-mh++`: add huge margins right and left
* `.u-*-mv++`: add huge margins top and bottom

`$inuit-enable-responsive-margins--negative`:

* `.u-*--m`: add default negative margins to all sides
* `.u-*--mt`: add default negative margin top
* `.u-*--mr`: add default negative margin right
* `.u-*--mb`: add default negative margin bottom
* `.u-*--ml`: add default negative margin left
* `.u-*--mh`: add default negative margins right and left
* `.u-*--mv`: add default negative margins top and bottom

`$inuit-enable-responsive-margins--negative-tiny`:

* `.u-*--m--`: add tiny negative margins to all sides
* `.u-*--mt--`: add tiny negative margin top
* `.u-*--mr--`: add tiny negative margin right
* `.u-*--mb--`: add tiny negative margin bottom
* `.u-*--ml--`: add tiny negative margin left
* `.u-*--mh--`: add tiny negative margins right and left
* `.u-*--mv--`: add tiny negative margins top and bottom

`$inuit-enable-responsive-margins--negative-small`:

* `.u-*--m-`: add small negative margins to all sides
* `.u-*--mt-`: add small negative margin top
* `.u-*--mr-`: add small negative margin right
* `.u-*--mb-`: add small negative margin bottom
* `.u-*--ml-`: add small negative margin left
* `.u-*--mh-`: add small negative margins right and left
* `.u-*--mv-`: add small negative margins top and bottom

`$inuit-enable-responsive-margins--negative-large`:

* `.u-*--m+`: add large negative margins to all sides
* `.u-*--mt+`: add large negative margin top
* `.u-*--mr+`: add large negative margin right
* `.u-*--mb+`: add large negative margin bottom
* `.u-*--ml+`: add large negative margin left
* `.u-*--mh+`: add large negative margins right and left
* `.u-*--mv+`: add large negative margins top and bottom

`$inuit-enable-responsive-margins--negative-huge`:

* `.u-*--m++`: add huge negative margins to all sides
* `.u-*--mt++`: add huge negative margin top
* `.u-*--mr++`: add huge negative margin right
* `.u-*--mb++`: add huge negative margin bottom
* `.u-*--ml++`: add huge negative margin left
* `.u-*--mh++`: add huge negative margins right and left
* `.u-*--mv++`: add huge negative margins top and bottom

`$inuit-enable-responsive-margins--none`:

* `.u-*-m0`: remove margins
* `.u-*-mt0`: remove margin top
* `.u-*-mr0`: remove margin right
* `.u-*-mb0`: remove margin bottom
* `.u-*-ml0`: remove margin left
* `.u-*-mh0`: remove margins right and left
* `.u-*-mv0`: remove margins top and bottom

`$inuit-enable-responsive-paddings`:

* `.u-*-p`: add default padding to all sides
* `.u-*-pt`: add default padding top
* `.u-*-pr`: add default padding right
* `.u-*-pb`: add default padding bottom
* `.u-*-pl`: add default padding left
* `.u-*-ph`: add default padding right and left
* `.u-*-pv`: add default padding top and bottom

`$inuit-enable-responsive-paddings--tiny`:

* `.u-*-p--`: add tiny padding to all sides
* `.u-*-pt--`: add tiny padding top
* `.u-*-pr--`: add tiny padding right
* `.u-*-pb--`: add tiny padding bottom
* `.u-*-pl--`: add tiny padding left
* `.u-*-ph--`: add tiny padding right and left
* `.u-*-pv--`: add tiny padding top and bottom

`$inuit-enable-responsive-paddings--small`:

* `.u-*-p-`: add small padding to all sides
* `.u-*-pt-`: add small padding top
* `.u-*-pr-`: add small padding right
* `.u-*-pb-`: add small padding bottom
* `.u-*-pl-`: add small padding left
* `.u-*-ph-`: add small padding right and left
* `.u-*-pv-`: add small padding top and bottom

`$inuit-enable-responsive-paddings--large`:

* `.u-*-p+`: add large padding to all sides
* `.u-*-pt+`: add large padding top
* `.u-*-pr+`: add large padding right
* `.u-*-pb+`: add large padding bottom
* `.u-*-pl+`: add large padding left
* `.u-*-ph+`: add large padding right and left
* `.u-*-pv+`: add large padding top and bottom

`$inuit-enable-responsive-paddings--huge`:

* `.u-*-p++`: add huge padding to all sides
* `.u-*-pt++`: add huge padding top
* `.u-*-pr++`: add huge padding right
* `.u-*-pb++`: add huge padding bottom
* `.u-*-pl++`: add huge padding left
* `.u-*-ph++`: add huge padding right and left
* `.u-*-pv++`: add huge padding top and bottom

`$inuit-enable-responsive-paddings--none`:

* `.u-*-p0`: remove padding
* `.u-*-pt0`: remove padding top
* `.u-*-pr0`: remove padding right
* `.u-*-pb0`: remove padding bottom
* `.u-*-pl0`: remove padding left
* `.u-*-ph0`: remove padding right and left
* `.u-*-pv0`: remove padding top and bottom

view the full API [here](http://predixdev.github.io/px-spacing-responsive-design/sassdoc/)
