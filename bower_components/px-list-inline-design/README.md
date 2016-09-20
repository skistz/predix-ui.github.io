# List Inline

The Predix UI List Inline module simply displays a list as one horizontal row. This module is a fork of the [inuitcss list-inline module](https://github.com/inuitcss/objects.list-inline).


## Dependency

Predix UI's List Inline Module depends on one other Px module:

* [px-defaults-design](https://github.com/PredixDev/px-defaults-design)

## Upstream dependency

The List Inline module is also an upstream dependency in this meta kit:

* [px-meta-lists-design](https://github.com/PredixDev/px-meta-lists-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save px-list-inline-design

Once installed, `@import` into your project's Sass file in its Objects layer:

    @import "px-list-inline-design/_objects.list-inline.scss";

## Usage

These flags are available and, if needed, should be set to `true` prior to importing the module:

    $inuit-enable-list-inline--delimited

This variable can be customized:

    $inuit-list-inline-delimit-character

Basic usage of the List Inline module uses one required class:

    <ul class="list-inline">
        <li>Foo</li>
        <li>Bar</li>
        <li>Baz</li>
    </ul>

The only valid children of the `.list-inline` node are `<li>`s.

## Options

Another, optional, class can supplement the required base class:

* `.list-inline--delimited`: add a character to delimit list items.

For example:

    <ul class="list-inline list-inline--delimited">
        <li>Foo</li>
        <li>Bar</li>
        <li>Baz</li>
    </ul>

view the full API [here](https://predixdev.github.io/px-list-inline-design/)
