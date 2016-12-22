# px-box-sizing-design

The box-sizing module sets the `box-sizing` property of all elements to `border-box`. Using the `border-box` model makes it easier to understand how changes to an element's spacing properties like `margin` or `padding` will impact the flow of elements. [Read more about `box-sizing` on the Mozilla Developer Network website.](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)

**px-box-sizing-design is a Predix UI CSS module.** You can find a demonstration and full documentation on the [Predix UI catalog](https://predixdev.github.io/predix-ui/?show=px-box-sizing-design&type=css]).

## Install the module

To use the module, you need to install it in your project using Bower. Run this task on the command line from inside your project folder:

```
bower install --save px-box-sizing-design
```

## Import it in your Sass

The module won't do anything until you import and configure it in your project Sass file. Follow these steps to import it:

### 1. Enable Flags

There are no flags to set before importing this module in your project Sass file.

### 2. Customize Styles

There are no style variables to set before importing this module in your project Sass file.

### 3. Import Sass File

Import the module by placing this code into the **Generic** layer of your project Sass file:

```
@import 'px-box-sizing-design/_generic.box-sizing.scss';
```

## Use it in your project

Importing this module in your Sass will automatically set the following variable flag to `true` for other components:

```
$intuit-global-border-box : true;
```

This will tell other modules that you are using the `border-box` CSS box model. You don't have to do anything else.

The component will also set all elements to use `box-sizing: border-box`.

## Dependencies

This module doesn't have any dependencies.
