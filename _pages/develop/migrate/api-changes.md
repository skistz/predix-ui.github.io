---
title: Release Notes & API Changes
moduleName: view-develop-api-changes
pathToRoot: ../../../
layout: default
---

## General changes to all Predix UI components
* Default Predix color values have been removed from all of the CSS variables provided in the system. Without a theme, components will appear with a mostly monochromatic "generic" theme.
* You should include px-theme or px-dark-theme in your application, or create and include your own theme, to style the Px components accordingly. See the documentation [here](#/develop/migrate/theme) for more information.
* Px-localize-behavior has been deprecated. All of the localized components will ship with English translations by default, but applications should provide their own resources object as necessary in order to localize components for non-English languages.

# New Components
## px-accordion
* The px-accordion component provides expandable and collapsible subsection headers for a page. [API Documentation](#/elements/px-accordion)

## px-heatmap-grid
* The px-heatmap-grid is a highly visual and flexible interactive component for visualizing a data set based on a heat map scale of colors. [API Documentation](#/elements/px-heatmap-grid)

## px-key-value-pair
* The px-key-value-pair component allows you to prominently display information in a dashboard. [API Documentation](#/elements/px-key-value-pair)

## px-tree
* The px-tree component provides an expandable and selectable tree. The contents are controlled primarily through a structured object of branch and leaf nodes. [API Documentation](#/elements/tree/px-tree)


# Existing Components

## px-alert-label (v2)
* New boolean property `badge` has been added for enabling the alert/severity badges currently used in `px-alert-message` and `px-inbox` - the `type` property determines what color and shape will appear, whereas the `label` property can be repurposed for the (single-digit) numeric indicator
* The `type` value "info" was expanded to "information" in order to match the API of px-alert-message, however either value will work as expected.

<!--## px-app-nav (v2)
* DAVID-->

## px-card (v1)
* The `chevron` property has been removed, as it never really functioned as intended ([Forum Question](https://forum.predix.io/questions/21210/what-is-the-reason-for-the-chevron-button-on-the-p.html)). Instead, a content slot has been added so that anything included in a container of class "actions" will be displayed in the top right corner of the card in the header area. See the demo page for an example implementation.
* The documentation of this repo has been greatly improved and decluttered. For information on the px-deck, px-dashboard, and px-card behavior components of this repo, use the dropdown at the top of the demo page.
* A new property called `fullBleed` has been added, which causes the content area of the card to stretch the full width of the card, removing the default horizontal padding. Useful for cards containing maps, images, and other content that requires more horizontal space.

## px-colors-design (v1.0.1)
* All of the sass variable names have changed to support the completely redesigned Predix UI color palette.

<!--## px-context-browser (v2)
* DAVID-->

## px-data-table (v4)
* The "rows per page" dropdown has been updated to use `px-dropdown` for cross-browser consistency ([#115](https://github.com/predixdev/px-data-table/issues/115)).
* When a custom `pageSize` value is passed into the table, it will be displayed as the selected choice in the "rows per page" dropdown ([#118](https://github.com/predixdev/px-data-table/issues/118)).
* A new property for `pageSizeOptions` has been added, which allows developers to specify their own array of options for the "rows per page" dropdown ([#123](https://github.com/predixdev/px-data-table/issues/123)). Add the same option to both `pageSize` and `pageSizeOptions` to make it both the default choice as well as a persistent option.
* The `tableRows` property has been removed, as horizontal borders are now the default style for Predix UI tables. It has been replaced with a `tableCells` property, which can be used to create the previous default style, a table with both horizontal and vertical borders.

## px-dropdown (v4)
* The `px-dropdown-content` subcomponent no longer exists. Several properties have been moved to the main `px-dropdown` component.
* Most of the CSS variables for `px-dropdown` have gone away. Styling for the invoking element can still be achieved using the `buttonStyle` property and the CSS variables for buttons.
* The `boundTarget` property now expects a CSS selector string instead of a reference to the actual HTML element that will be used for the outer bounds of the dropdown.
* The `checkboxMode` property is now called `multi`.
* By default, the dropdown button will display the selected item or number of selected items ([#34](https://github.com/predixdev/px-dropdown/issues/34)). Use the `hideSelected` property to disable this behavior in use cases such as px-data-table, where the `displayValue` of "Show/Hide Columns" should always be displayed.
* The `displayValue` property is no longer overwritten when the user selects an item. In `multi` mode, the `displayValue` is appropriately restored when all selections are cleared ([#40](https://github.com/predixdev/px-dropdown/issues/40)).
* A new clear button has been added for quickly de-selecting all values and restoring the dropdown to its default state and `displayValue`. This also allows users to clear the dropdown when not in multi-select mode, which was not previously possible.
* When `multi` is false (i.e. single-select mode), use `selectBy` to determine whether a "key" or "val" will be passed to the `selected` property. When `multi` is true, use `selectBy` to determine whether an array of "key" or "val" items will be passed to the `selectedValues` property. In either single or multi mode, the `selectedItems` property will contain a reference to the actual `<div>` elements in the dropdown that have been selected.
* Set `sortMode` to "key" or "val" to sort the dropdown options. By default, they will be displayed in the order they are passed in to the `items` array. The `sortCheckedItems` and `sortDisabledItems` properties have been removed for simplicity.
* The `px-dropdown-value-changed` and `px-dropdown-checkbox-changed` events have been consolidated into a single `px-dropdown-selection-changed` event, which will fire in either single or multi-select mode.
* All of the orientation and sizing logic has been simplified by using Google's `iron-dropdown` instead of the custom code in previous versions of dropdown. The properties for `extendDropdown`, `extendDropdownBy`, `maxContentCharacterWidth`, and the use of px-tooltip have all been removed.
* Similar to `px-tables-design`, the styling for the exterior borders and interior borders have been separated to enable the new design. The CSS variables have been separated accordingly to distinguish between `--px-data-table-border-color` (exterior) and `--px-data-table-separator-color` (interior).
* Keyboard support has been added for accessibility.

## px-forms-design (v2)
* Many of the CSS variables for the form inputs have been removed, changed, or renamed based on the redesigned components. See [the API](#/css/visual/px-forms-design) for the full list of updated CSS variables.

## px-headings-design (v1)
* In addition to the six heading sizes previously available, new classes have been added to enable aspects of the Predix redesign. New heading styles include `heading--page` (large), `heading--section` (all caps), and `heading--subsection` (smaller, with a background). Additional styles have also been added for the label/value pairs often seen in Predix applications with the classes `label` and `value`.

## px-icon-set (v2)
* The px-polymer-font-awesome repository has been renamed to px-icon-set, and all of the Font Awesome icons have been replaced with the custom Predix UI icons created during the redesign. The API has also  changed (`<px-icon icon="">` is now used), and all of the new icons fall into 3 different namespaces (`pxs:icon`, `pxm:icon`, and `pxl:icon` as opposed to the previous `fa:fa-icon`) and new icon names. Both px-icon-set.html and px-icon.html should be imported in your application. See [the API](#/modules/px-icon-set) page for the full icon list and cheat sheet.

## px-inbox (v2)
* The `height` property has been removed in favor of the `--px-inbox-height` CSS variable, which defaults to 100vh. Also, a `--px-inbox-list-width` variable has been added, which defaults to 320px (previously the list was set to take up 1/3 of the total component.
* List items can now be passed without a severity, in which case an icon will not appear next to the item.
* A new boolean property called `disableAutoSelect` has been added which will prevent the inbox from automatically selecting the first item in the list ([#7](https://github.com/PredixDev/px-inbox/issues/7)). A check was also added so that when a `selectedItem` is passed into the component, it will not be overridden by this behavior.
* Both ascending and descending sort are now possible using either the `sortOrder` property or the arrow icon next to the sort dropdown ([#6](https://github.com/PredixDev/px-inbox/issues/6)).

## px-list-ui-design (v2)
* Similar to `px-tables-design`, the styling for the top/bottom borders and interior borders have been separated to enable the new design. The CSS variables have been separated accordingly to distinguish between `--px-list-ui-border-color` (top/bottom borders) and `--px-list-ui-separator-color` (interior borders).

## px-overlay (v1)
* The `type` property and the two corresponding CSS variables have been removed. Use the new `--px-overlay-color` CSS variable with an rgba value to adjust the color and opacity of the overlay.

## px-progress-bar (v1)
* The `striped` and `animated` properties have been removed as part of the redesign. An `infinite` property takes the place of both properties for distinguishing between a determinate/measurable progress bar that fills from left to right (when "false" or omitted) and an indeterminate/infinite progress bar (when "true") that continually animates when a discrete percentage can't be calculated.

## px-tables-design (v2)
* The `table--rows` flag and class have been removed, as horizontal borders are now the default style for Predix UI tables. It has been replaced with a `table--cells` flag and class, which can be used to create the previous default style, a table with both horizontal and vertical borders.
* Styling for the exterior borders and interior borders have been separated to enable the new Predix design for tables, which features a darker top and bottom border and lighter interior borders. The CSS variables have been separated accordingly to distinguish between `--px-table-border-color` (top/bottom) and `--px-table-separator-color` (interior borders).

## px-tabs (v1)
* The `bare` and `noBottomBorder` properties have been removed. The bare style is now the default/only appearance for Predix UI tabs. Several of the related CSS variables have also been removed.

## px-tooltip (v1)
* The `tooltip-style` property has been removed. See the [theming documentation](#/develop/migrate/theme) for more information on using the light and dark theme, or use the provided CSS variables to override the style of the component.

# Deprecated Components
#### px-drawer
#### px-input-group-design
#### px-localize-behavior
#### px-sample-cards
