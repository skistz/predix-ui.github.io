---
title: Mobile app development
moduleName: view-develop-mobile
pathToRoot: ../../
layout: default
---

<style>
  .approach {
    display: flex;
    margin: 1rem 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    align-items: center;
  }
  .approach__label {
    opacity: 0.8;
    margin-right: 0.35rem;
  }
  .approach__tag {
    display: block;
    font-weight: 700;
    padding: 0.1rem 0.25rem;
    background-color: black;
    color: white;
    margin-right: 0.35rem;
  }
  .approach__tag--pwa {
    background-color: #C47A14; /*$orange7*/
  }
  .approach__tag--hybrid {
    background-color: #3E796F; /*$teal7*/
  }
  .approach__tag--native {
    background-color: #BC385E; /*$pink7*/
  }
</style>

*This guide is under development and subject to change. Recommendations and information may change. Check back for updates.*

The Predix Design System supports mobile app development with design guidelines, stencils, CSS modules, and components built to support handheld and touch-based input devices. Building a mobile app requires some additional planning and configuration work above the standard desktop web app creation process.

# Choose a development approach

There are multiple approaches to building a mobile application. Evaluate the best approach on an app-by-app basis. Not all apps are suited to the same approach.

**Recommendation:** In general, start prototyping with progressive web apps. Move to hybrid apps when more advanced native APIs are required. Build native apps only when the other two approaches do not address the app's requirements.

--------------------------------------------------------------------------------

## Progressive web app

<div class="approach">
  <span class="approach__label">Approach:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
</div>

Progressive web applications run in the mobile device browser — users visit a URL to open the app. Progressive web apps use HTML, CSS and JavaScript for the UI and web APIs like Service Worker, ApplicationCache, IndexDB, and LocalStorage for caching and data management.

Developers apps can use Predix Design System components to build responsive UIs that work on desktop and mobile devices. Progressive web apps are often used primarily on desktop but must have a mobile component. However, new web platform APIs and development approaches make it easier to build native-feeling experiences with progressive web apps. Progressive web apps can be written once and used on any device with a web browser.

Example use cases:

* a data collection app with some simple analysis capabilities that will be used the same way on desktop and mobile devices
* a desktop-focused analysis app with a slimmed down mobile dashboard UI that displays key metrics to users away from their desk
* an existing web app with extensive feature development that must be extended to support mobile devices

--------------------------------------------------------------------------------

## Hybrid app

<div class="approach">
  <span class="approach__label">Approach:</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

Hybrid applications run on a cross-platform runtime that looks like a native app to the user — users download and install the app from an app store. Hybrid apps use HTML, CSS and JavaScript for the UI and native platform APIs, usually exposes through plugins, for local caching and data management.

Developers can leverage existing HTML, CSS and JavaScript assets like the Predix Design System components to build the app front-end, but user lower-level native APIs to add more complex features like reading/writing from the filesystem, using realtime geolocation and accelerometer data, quickly capturing images or videos from the camera, and anything a native app can do. Hybrid apps can be written once and deployed to most mobile devices (iOS, Android) using toolkits like the Predix Mobile SDK.

Example use cases:

* a field service app for work management & execution that will be used only on mobile devices and requires offline-first data collection and syncing behaviors
* a complex monitoring & diagnostics app that uses geolocation and other high-fidelity native APIs to show data relevant to the user's location
* a dashboard app that relies on push notifications and integration with other native apps to keep hte user constantly updated about the status of assets

--------------------------------------------------------------------------------

## Native app

<div class="approach">
  <span class="approach__label">Approach:</span>
  <span class="approach__tag approach__tag--native">Native</span>
</div>

Native applications run directly on the mobile device runtime — users download and install the app from an app store. Native apps use native platform APIs for the UI and for local caching and data management.

Native apps are well suited to high-intensity animation and complex interaction patterns that are hard to implement in a cross-platform way using web technologies. The Predix Design System components are not built to support native apps unless they are used in a web view. Designers and developers can use the design system stencils to compose wireframes or mockups and translate those static assets into code. Native apps are usually written for one platform only. The app UI and other behaviors will have to be created from scratch for iOS and Android.

The following sections of this guide assume you are using a progressive web app or hybrid app approach and do not address native app development questions.

# Create responsive layouts

All app layouts should be fluid and automatically respond to different viewport sizes. Progressive web apps that target desktop and mobile should scale and look correct on large screens and small screens. Hybrid apps or progressive web apps that focus only on mobile should at least scale naturally between different handheld viewport sizes — from large tablets to small mobile phones.

**Recommendation:** Use the Predix Design System CSS modules' helpful variables and utilities to create responsive app layouts. [See the start kit instructions to learn about how start using CSS modules if they aren't already used in your app.](/#/css/px-starter-kit-design) Read the sections below for specific instructions on using the CSS modules to create responsive layouts.

--------------------------------------------------------------------------------

## CSS breakpoints and query helpers

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

Writing responsive CSS means using [media queries with breakpoints](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). The [px-helpers-design](https://www.predix-ui.com/#/css/visual/px-helpers-design) CSS module defines common breakpoints for most device types.

To use the helpers module, ensure that at least the following bower components are installed and included in your app's `bower.json` file:

```bash
bower install --save-dev px-defaults-design px-normalize-design px-box-sizing-design px-helpers-design
```

Ensure each component is imported into your application Sass file (e.g. `sass/application.scss`). Your application Sass file should include at least the following:

```scss
// Settings
@import "px-defaults-design/_settings.defaults.scss";

// Generic
@import "px-normalize-design/_generic.normalize.scss";
@import "px-box-sizing-design/_generic.box-sizing.scss";
@import "px-helpers-design/_generic.helpers.scss";

// Component (your app styles)
/* your styles go here */
```

Now that the helpers module is imported, the following breakpoints are available:

* "palm" - "screen and (max-width: 44.9375em)"
* "lap" - "screen and (min-width: 45em) and (max-width: 63.9375em)"
* "lap-and-up" - "screen and (min-width: 45em)"
* "portable" - "screen and (max-width: 63.9375em)"
* "desk" - "screen and (min-width: 64em)"
* "retina" - "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)"

Use these breakpoints inside your CSS rules to resize the layout when the screen size changes. The helpers module provides the `media-query` Sass mixin to help to do this.

For example, the following Sass shows a collapses a sidebar and main content area into a single column on small screens and places them side-by-side on large screens:

```html
<div class="sidebar">
  <a>Sidebar Link 1</a>
  <a>Sidebar Link 2</a>
</div>
<div class="main-content">
  <p>Main content goes in here.</p>
</div>
```

```scss
// Component (your app styles)

.sidebar {
  display: block
  width: 100%;
}

.main-content {
  display: block;
  width: 100%;
}

@include media-query(lap-and-up) {
  .sidebar {
    float: left;
    width: 30%;
  }
  .main-content {
    float: right;
    width: 70%;
  }
}
```

--------------------------------------------------------------------------------

## CSS width and flexbox utilities

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

The Predix Design System CSS modules also include multiple higher-level ways of laying out pages using class names. There are multiple approaches to using the CSS modules to do responsive design. Use the flexbox-based utilities for a simple, flexible starting point for app layout.

The following CSS modules help with responsive layout using flexbox:

* [px-flexbox-design](https://www.predix-ui.com/#/css/layout/px-flexbox-design): creates flex containers which automatically size flex child elements into nice grids
* [px-widths-responsive-design](https://www.predix-ui.com/#/css/layout/px-widths-responsive-design): defines breakpoint-based classes to automatically size elements within a parent container

To use these CSS modules, ensure they are installed and included in your app's `bower.json` file:

```bash
bower install --save-dev px-flexbox-design px-widths-responsive-design
```

Import the modules in your application Sass file (e.g. `sass/application.scss`). The flexbox module should be placed in the base layer, and the widths responsive module should be placed in the trumps layer:

```scss
// Settings
/* ... */

// Generic
/* ... */

// Base
@import "px-flexbox-design/_base.flexbox.scss";

// Component (your app styles)
/* ... */

// Trumps
@import "px-widths-responsive-design/_trumps.widths-responsive.scss";
```

The same layout created above using media queries and CSS rules could be implemented using utility classes instead. The classes will render the sidebar and main content area into a single column on small screens and place them side-by-side on large screens:

```html
<div class="flex">
  <!-- Sidebar -->
  <div class="u-1/4-lap-and-up u-1/1-palm">
    <a>Sidebar Link 1</a>
    <a>Sidebar Link 2</a>
  </div>
  <!-- Main content -->
  <div class="u-1/4-lap-and-up u-1/1-palm">
    <p>Main content goes in here.</p>
  </div>
</div>
```

The widths responsive module automatically defines whole, half, third, quarter, and sixth-based classes for all of the breakpoints defined in px-helpers-design. [See the px-widths-responsive-design documentation for more info on creating responsive layouts.](https://www.predix-ui.com/#/css/layout/px-widths-responsive-design)

--------------------------------------------------------------------------------

## Viewport meta tags

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

Layouts are rendered differently in each mobile web browser and hybrid app web view. Set the [viewport meta tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) in your app to ensure your app automatically scales content to fit the window. Place the following tag near the top of your app's base HTML file:

```html
<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, maximum-scale=1">
```

Read more about each of the viewport meta attributes [on the MDN website](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag).

# Offline app behaviors

Mobile apps should work when users cannot connect to the internet. Offline apps use caching to save files required to load and interact with the app on the users device, so apps can be loaded when the network is not available. Offline apps also use data management and syncing to allow users to complete tasks offline and sync the result of those tasks with the cloud later when connected to a network.

Apps can be offline-first or offline-enabled:
* offline-first apps assume assume network access will usually be unavailable and utilize caching and data management behaviors to support the same user workflows that are available online
* offline-enabled apps assume network access will usually be available, but provide caching and some data management behaviors so apps can still be accessed offline

Considering offline behaviors can improve performance for all apps, even when they won't be used offline. Many of the optimizations required to support offline use also help users on slow connections, and generally help developers focus on optimizing loading time for critical app workflows.

--------------------------------------------------------------------------------

## Caching with Service Worker and ApplicationCache

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

The [Service Worker specification](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) allows app developers to cache files in the browser and retrieve them later. Registering a Service Worker allows users to load an app when they are offline or on slow connections. These techniques are useful most useful for progressive web apps, which require users to load HTML, CSS, and JavaScript files off a remote server to view an app.

Service Workers are not yet supported on all platforms. [Android and some other browsers](http://caniuse.com/#feat=serviceworkers) support service workers today. iOS Safari and web views do not support Service Worker today (but [Apple are working to implement it](https://webkit.org/status/#specification-service-workers) in a future release).

When Service Workers are not an option, apps should fall back to [HTML5 ApplicationCache](https://www.html5rocks.com/en/tutorials/appcache/beginner/). ApplicationCache is deprecated for the future but is still [supported by all modern browsers](https://caniuse.com/#feat=offline-apps) during the transition to Service Workers.

**Recommendation:** Progressive web apps should attempt to register a Service Worker and supply an ApplicationCache manifest as a fallback. Browsers that support service workers will skip the ApplicationCache manifest and user the more powerful service worker.

Service Worker tools and relevant reading:
* [sw-precache: helps generate a service worker with minimal configuration](https://github.com/GoogleChrome/sw-precache)
* [Tutorial: Adding a Service Worker with sw-precache and gulp](https://codelabs.developers.google.com/codelabs/sw-precache/#3)
* [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)

ApplicationCache tools and relevant reading:
* [gulp-manifest: generate HTML5 cache manifest files with gulp](https://github.com/hillmanov/gulp-manifest)
* [Don’t Wait for ServiceWorker: Adding Offline Support with One-Line](https://davidwalsh.name/dont-wait-serviceworker-adding-offline-support-oneline)
* [A Beginner's Guide to Using the Application Cache](https://www.html5rocks.com/en/tutorials/appcache/beginner/)

--------------------------------------------------------------------------------

## Data management with IndexedDB and LocalStorage

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--pwa">PWA</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

Saving important app data locally for offline access can be done in progressive web apps and hybrid apps using web the IndexedDB and LocalStorage web APIs. Apps can save data like asset performance metrics, work order histories, or even user-generated data created offline that should be synced to the cloud when network connectivity is restored.

[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) exposes a large, database-like data storage and querying system that can be accessed asynchronously (without blocking rendering in the DOM). IndexedDB supports storage of arbitrary data types (e.g. strings, arrays, object) and SQL-style queries to retrieve or save data.

[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) exposes a more simple data storage system that can only save data that can be represented as a string. Interacting with LocalStorage is synchronous and blocks rendering, making it unsuitable for retrieving or saving large amounts of data.

**Recommendation:** Use LocalStorage for simple data management needs, like saving small amounts of data for offline use or saving basic user-generated data that should be synced to the cloud when network connectivity is restored. Use IndexedDB for large datasets that require complex queries to read, or to save large user-generated data structures to sync later.

--------------------------------------------------------------------------------

## Data management with Predix Mobile SDK

<div class="approach">
  <span class="approach__label">Relevant Approaches:</span>
  <span class="approach__tag approach__tag--hybrid">Hybrid</span>
</div>

Hybrid web apps can use more advance native APIs and other runtimes to save data locally. The Predix Mobile SDK provides a set of high-level and low-level data management APIs that can called by hybrid apps to read and save data. The Predix Mobile SDK uses Couchbase, a full NoSQL document store that supports complex queries and transactions.

The SDK also provides additional native APIs to support secure data storage, connectivity management, authentication, user settings storage, and more.

**Recommendation:** Use the Predix Mobile SDK when your application requires advanced NoSQL document query APIs or when you need other complex behaviors not easily implemented using web APIs.
