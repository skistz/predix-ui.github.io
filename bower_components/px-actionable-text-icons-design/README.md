# Actionable Text &#38; Icons

Predix UI Actionable Text &#38; Icons module is used to initiate an action associated to the text string or icon.


## Dependencies

Px's Actionable Text &#38; Icons module depends on two other Px modules:

* [px-colors-design](https://github.com/PredixDev/px-colors-design)
* [px-defaults-design](https://github.com/PredixDev/px-defaults-design)


## Installation

Install this module and its dependencies using bower:

    bower install --save px-actionable-text-icons-design

Once installed, `@import` into your project's Sass file in its Objects layer:

    @import "px-actionable-text-icons-design/_objects.actionable.scss";

## Usage

These flags are available and, if needed, should be set to `true` prior to importing the module:

    $actionable  
    $actionable--select  
    $actionable--action  
    $actionable--disabled  
    $actionable--small  
    $actionable--large  
    $actionable--huge  

## Options

These classes are available if the variable flags listed above are set to `true`:

* `actionable--[small|large|huge]`: Small, large or huge Actionable Text &#38; Icons
* `actionable--[select|action|disabled]`: select, action, or disabled Actionable Text &#38; Icons

Please view the full API [here](http://predixdev.github.io/px-actionable-text-icons-design/)
