# px-defaults-design

The defaults module contains variables and settings that are *required* for using nearly all Predix UI CSS modules.

## Installation

Install the module and any dependencies using Bower. Run this task from the command line inside your project folder:

    bower install --save px-defaults-design

## Enable and Import

### Enable Flags

There are no flags to set before importing this module in your project Sass file.

### Import Sass

Import the module by placing this code into the `Settings` layer of your project Sass file:

     @import 'px-defaults-design/_settings.defaults.scss';

## Usage

The module defines default variables that many modules in your project will rely on. The values are set as defaults, and should be overriden in your project Sass file, not by editing the `_settings.defaults.scss` file.

The variables and their default settings are:

    // Base font size
    $inuit-base-font-size           : 15px !default;

    // Base line height (leading)
    $inuit-base-line-height         : 20px !default;

    // Base text color
    $inuit-base-text-color          : rgb(0,0,0) !default;

    // Base background color
    $inuit-base-background-color    : rgb(255,255,255) !default;

    // Would you like inuitcss’ classes to be prepended with a namespace? If so, define it here.
    $inuit-namespace                : null !default;

You can override these by assigning your own values to these variables before you import the module in your project Sass file:

    // In sass/project-name.scss manifest file in your project
    ...
    $inuit-base-font-size: 14px;
    $inuit-base-line-height: 18px;
    @import 'px-defaults-design/_settings.defaults.scss';
    ...

## Dependencies

This module depends on the following Predix UI CSS modules:

* [px-functions-design](https://github.com/PredixDev/px-functions-design)
