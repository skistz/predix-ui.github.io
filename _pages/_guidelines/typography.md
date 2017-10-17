---
title: Typography
layout: default
moduleName: px-typography
pathToRoot: ../../
---

# Best practices

## Exclusively use GE Inspira Sans
Inspira Sans is core part of the GE and Predix brand and was developed with digital use cases in mind. Offered in several weights and styles, it is the sole typeface of a Predix app.

## Create a typographic hierarchy
The Predix Design System has recommended sizes for page elements designed to make it easy to create an easy to scan information hierarchy. Utilize these sizes. Consider how your layout will be consumed and build a typographic hierarchy around it.

## Be selective with the use of bold
The Predix visual language is designed to be lightweight and easy to scan. Overusing bold can make an interface heavy and difficult to identify important information. Use Inspira Sans Bold in limited situations such as calling out the user's current location in a hierarchy or highlighting their selected state.

## Be consistent
Consistency is a principle of the design system and it applies to type. Your application should have a consistent and expected usage of typography across all workflows.

# Type Family

GE Inspira Sans is the only typeface used in Predix applications. For design purposes, it's included in multiple formats in the [Design Starter Kit](https://github.com/PredixDev/px-design-stencils). Additionally, it's included with and consumed by Predix UI Components.

## Foo bar

While it is available in regular, bold, italic and bold italic forms, we discourage the use of GE Inspira Sans Bold and Bold Italic on Web and UI applications.

# Size &amp; Usage

Suggested type sizes for applications are as follows:

| Element | Usage | Size &amp; Apperance |
| ------- | ----- | -------------------- |
| Page headers &amp; titles | <catalog-picture img-src="../../../img/guidelines/page_header"></catalog-picture> | 20px, uppercase |
| Section header | <catalog-picture img-src="../../../img/guidelines/section_header"></catalog-picture> | 20px, uppercase |
| Sub-section header | <catalog-picture img-src="../../../img/guidelines/section_header"></catalog-picture> | 20px, uppercase |
| Body copy | <catalog-picture img-src="../../../img/guidelines/body_copy"></catalog-picture> | 15px, 20px line spacing |
| Labels | <catalog-picture img-src="../../../img/guidelines/body_copy"></catalog-picture> | 12px uppercase |

In total, there are seven font sizes available ranging from 12px to 75px. Font sizes above 30px are reserved for use on dashboard widgets.

<catalog-picture img-src="../../../img/guidelines/type_sizes" alt="Body copy"></catalog-picture>

# Hierarchy

It's important to maintain an consistent typographic hierarchy in your application. Mixing font sizes and styling without considering which information is most important can impede efficiency and purposefulness.

<catalog-guideline title="Do" img-src="../../../img/guidelines/type_hierarchy_good">
  Cascading type sizes based on importance of information can help indicate an information hierarchy.
</catalog-guideline>

<catalog-guideline title="Don't" img-src="../../../img/guidelines/type_hierarchy_dont">
  Not utilizing a hierarchy or using type sizes in a random fashion makes it harder for users to understand what's most important.
</catalog-guideline>

# Weight

While it is available in both normal and bold weights, it is advised to use bold sparingly. For example, bold can be used to indicate the current selected state on a tab or in the context browser. It should not be used in displaying headers, titles and metadata.

<catalog-guideline title="Do" img-src="../../../img/guidelines/bold_yes">
  Use bold sparingly. It can be used for emphasis of selected items such as to indicate the location in a hierarchy.
</catalog-guideline>

<catalog-guideline title="Don't" img-src="../../../img/guidelines/bold_no">
  Over applying bold can result in an app that is visually heavy and hard to scan.
</catalog-guideline>
