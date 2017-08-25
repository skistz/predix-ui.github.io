---
title: <px-icon icon="px-fea:deployments"></px-icon> Using Icons
moduleName: view-develop-migrate-icons
pathToRoot: ../../../
layout: default
---

This guide addresses how to use icons in the Predix Design System.

# <px-icon icon="px-fea:alerts"></px-icon> What changed
Before the design refresh, Predix Design System relied on Font Awesome icons. Font Awesome was both shipped as part of the design system and many components had customization options where developers could specify Font Awesome icon names to get them to display in the component.

Now, the design refresh introduced several beautiful sets of custom icons which have been designed specifically for industrial applications and equipment. The native use of Font Awesome icons in Predix Design System components has been deprecated. When dealing with components, now you will need to specify PX Icon names instead of Font Awesome icon names.

<div class="guidelines">
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:rail-yard"></px-icon>
  <px-icon icon="px-obj:locomotive"></px-icon>
</div>

# <px-icon icon="px-fea:home"></px-icon> Getting started
To start using the Predix Design System icons, you should first check out all the available icons on our site [here](https://www.predix-ui.com/#/elements/px-icon-set).

The site shows each icon along with its full name, the set it belongs to, and its optimized size. While possible to change the size of the icon from its optimized size, they were designed to be used at the specified size and may not look as good at a different size. Our Design recommendation is to NOT change the size of the icon and instead, either use a different icon, or request an new optimized icon. Consult with your designers.

# <px-icon icon="px-fea:microservice"></px-icon> Upgrading Px components
If you want to specify icons for Predix Design System components, follow the specific instructions on each component. In general, you'll want to replace the Font Awesome name with the full icon names, listed next to each icon on our website, such as, `px-obj:airplane`. Some components may require you to break up the name into a `set` and an `icon`. The set is the first part of the string before the colon (`px-obj`) and the icon name is the second part (`airplane`).

# <px-icon icon="px-fea:products"></px-icon> Using icons in your app/component
If you're upgrading, the first step is to remove `px-polymer-font-awesome` from your bower and remove all imports for `px-polymer-font-awesome.html`. `px-icon-set` replaces `px-polymer-font-awesome`, so you will not be able to have both.

To use the Predix Design System icons in your own app or component, you'll want to add `px-icon-set` to your bower dependencies.

``` js
"px-icon-set": "^2.0.0"
```

The `px-icon-set` will install all the icon sets and a `px-icon` component used to actually display the icons. You can choose the specific sets you want to incude, such or just import them all with `px-icon-set.html`.

Example only importing feature and navigation sets:
```html
<link rel="import" href="../px-icon-set/px-icon-set-feature.html" />
<link rel="import" href="../px-icon-set/px-icon-set-navigation.html" />
```

Example only importing all sets:
```html
<link rel="import" href="../px-icon-set/px-icon-set.html" />
```

You'll also want to import the `px-icon` component
```html
<link rel="import" href="../px-icon-set/px-icon.html" />
```

With a set and the icon component imported, you can now use the `px-icon` component display an icon <px-icon icon="px-obj:airplane"></px-icon>
```html
<px-icon icon="px-obj:airplane"></px-icon>
```

# <px-icon icon="px-obj:automobile"></px-icon> Under the hood
The `px-icon-sets` are a type of `iron-iconset-svg` and `px-icon` is a wrapper around `iron-icon` providing styling and sizing of the icon. To learn more about these, check out Polymer's docs on them: [iron-icon](https://www.webcomponents.org/element/PolymerElements/iron-icon/) and [icon-icon-set](https://www.webcomponents.org/element/PolymerElements/iron-iconset-svg)

Using `iron-iconset-svg` you can also create your own icons and use them in your app.

Since our icon sets are relying on `iron-icon`, you can just use `iron-icon` to display our icon sets. However, `px-icon` provides several customizations on top of `icon-icon`: first, `iron-icon` by default has a fill and no stroke; second, `px-icon` auto-sizes the icon to its optimized size, which `iron-icon` does not.

<style>
.custom-styling {
  color: #fdc52e;
  --iron-icon-width: 28px;
  --iron-icon-height: 28px;
  --iron-icon: {
    stroke-width: 0.75;
  }
}
</style>
# <px-icon class="custom-styling" icon="px-utl:edit"></px-icon> Custom styling
You can change the color of `px-icon` via the color CSS property. However, other property changes will require CSS variables. Since `px-icon` uses `iron-icon`, if you want the ability to do more styling, you can just use the `icon-icon` css variables listed in their docs.

Here is an example:
<style>
.custom-icon {
  color: #bae;
  --iron-icon-width: 100px;
  --iron-icon-height: 100px;
  --iron-icon: {
    stroke-width: 0.6;
  }
}
</style>
<px-icon class="custom-icon" icon="px-obj:gas-turbine"></px-icon>
```css
.custom-icon {
  color: #bae;
  --iron-icon-width: 100px;
  --iron-icon-height: 100px;
  --iron-icon: {
    stroke-width: 0.6;
  }
}
```
```html
<px-icon class="custom-icon" icon="px-obj:gas-turbine"></px-icon>
```

Note, the width and height were changed by way of example, but it is not recommended to tinker with the size. Since we did change the width and height, the line weight of the icon got scaled up and was too thick, so to compensate, we use the `--icon-icon` mixin to reduce the `stroke-width`.

# <px-icon icon="px-obj:imaging-machine"></px-icon> Requesting new icons
If you have an idea for a new icon, please feel free to to log a Github issue on the `px-icon-set` repo.

<link rel="import" href="https://cdn.rawgit.com/PolymerElements/iron-icons/8d999f71/social-icons.html" />
<style>
.companion-cube {
  --iron-icon-width: 32px;
  --iron-icon-height: 32px;
  --iron-icon: {
    stroke-width: 0.7;
  }
}
</style>

# <px-icon class="companion-cube" icon="social:pages"></px-icon> Using non-px icons
You can also use non-px icons with the `px-icon` component or `iron-icon`, such as Polymer's [iron-icons](https://www.webcomponents.org/element/PolymerElements/iron-icons). Just bring them into your project and use them like you would use a Px icon. Note that since the `px-icon` component uses a stroke instead of a fill, some iron-icons may not work great, having been designed with a fill. In this case, consider just using `iron-icon`.


```css
.the-cake-is-a-lie {
  color: #2AD;
  --iron-icon-width: 50px;
  --iron-icon-height: 50px;
  --iron-icon: {
    stroke-width: 0.5;
  }
}
```
```html
<px-icon class="the-cake-is-a-lie" icon="social:cake"></px-icon>
```
<style>
.the-cake-is-a-lie {
  color: #2AD;
  --iron-icon-width: 50px;
  --iron-icon-height: 50px;
  --iron-icon: {
    stroke-width: 0.5;
  }
}
</style>
<px-icon class="the-cake-is-a-lie" icon="social:cake"></px-icon>