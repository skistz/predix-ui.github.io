/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer/app-drawer.html","a54c20b0a0e76cbc5e930c1ebe2ddf85"],["/bower_components/app-localize-behavior/app-localize-behavior.html","c37df2f6d8bff0116e547b88b8d86caf"],["/bower_components/app-route/app-location.html","40fe423ff50b4d7ac8a8df5088b4430b"],["/bower_components/app-route/app-route-converter-behavior.html","dccecb824d90a3e92a4305aaa87f060c"],["/bower_components/app-route/app-route-converter.html","db54435e473ad02484efaa15c121c927"],["/bower_components/app-route/app-route.html","773be00ce4599a9fdc9935409536a053"],["/bower_components/iron-ajax/iron-ajax.html","8a5a2954627628d15c9b743eaedb9ac1"],["/bower_components/iron-ajax/iron-request.html","ec1ee3f307e826faa07cb6dbd6a43a77"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","42c03c616d99e540b9ca824154d02d89"],["/bower_components/iron-collapse/iron-collapse.html","000a0002d6ac2503c6e557b020fc3e26"],["/bower_components/iron-flex-layout/iron-flex-layout.html","85d3b39838d06aca06a79555fb7ab412"],["/bower_components/iron-icon/iron-icon.html","093ad4ac9b3899dc51b3ecd6895c1462"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","32ffdbe2ba2c1cee3e40342b11f1bf42"],["/bower_components/iron-label/iron-label.html","b04fc03baff994403c10dc2f3c88c1cc"],["/bower_components/iron-location/iron-location.html","f1dce10105d3249607522580626b32a6"],["/bower_components/iron-location/iron-query-params.html","4a47baa157ea3fdd25d7cd1f2df4b60d"],["/bower_components/iron-media-query/iron-media-query.html","68909d114753991b22e832a46c779989"],["/bower_components/iron-meta/iron-meta.html","096617a6902ecf280e60bd53c2fede0c"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","010350471b2567735a5df8cea781dd78"],["/bower_components/iron-selector/iron-multi-selectable.html","919e85334ed89a81b37d0e73f5747154"],["/bower_components/iron-selector/iron-selectable.html","e8b8aecb44692ff0531b81b45b941170"],["/bower_components/iron-selector/iron-selection.html","cc0797080a508370c26a7104a29433ca"],["/bower_components/iron-selector/iron-selector.html","c8946dcd397168b6ba3248f4ce7d0ca9"],["/bower_components/polymer/polymer-micro.html","e15a655cfe71eb49a501137cfffa17d6"],["/bower_components/polymer/polymer-mini.html","33590e553c48885f8b88d04a14ea0abe"],["/bower_components/polymer/polymer.html","f89f191dd506b254557b2c029e3e6920"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","cc07ceb4765b61c77aee3f69d87bd620"],["/bower_components/px-alert-message/css/px-alert-message-styles.html","d5a217a83e5d771be31a7b1ba0ad845b"],["/bower_components/px-alert-message/demo/demo.html","b8261c14ce1d79e22b5b5b575e8a08f5"],["/bower_components/px-alert-message/demo/px-alert-message-demo.html","f43f0c900c8c3467bc17d11a5bd4eefd"],["/bower_components/px-alert-message/index.html","5e862cf452e8efd06c08322e4ac09640"],["/bower_components/px-alert-message/px-alert-message.html","22070a9677bf4162edc4f7fc2dd7e076"],["/bower_components/px-alert-message/test/fixture.html","b1e964e465e4963a671bccd0b73410b3"],["/bower_components/px-dark-demo-theme/px-dark-demo-theme-styles.html","290fe85b759649b746a64b9c61991d40"],["/bower_components/px-dark-theme/px-dark-theme-styles.html","24a7a7886b34f207f929852a6a9a053b"],["/bower_components/px-demo/css/px-demo-code-editor-styles.html","e6283923990afe3f8a766415247ee5e0"],["/bower_components/px-demo/css/px-demo-styles.html","e1f6aaddb850ad0d181d1e7c2899389a"],["/bower_components/px-demo/index-dark-theme.html","6abe3bfbefe31302d7582f6a24999767"],["/bower_components/px-demo/index.html","329606948c21c7654bc7667ab1886942"],["/bower_components/px-demo/px-demo-api-viewer.html","cc08f05a77ecc6be5a1941865ea5da9d"],["/bower_components/px-demo/px-demo-behaviors.html","b1c729db188f5f6b51dad2b1527464e9"],["/bower_components/px-demo/px-demo-code-editor.html","342f3f1921960e5789a92d7306e822a4"],["/bower_components/px-demo/px-demo-collection.html","bf0e87b36d17c4782b98dd445453d07c"],["/bower_components/px-demo/px-demo-component-snippet.html","5fc3bae19a76ba74eff7e34bb22d7afb"],["/bower_components/px-demo/px-demo-configs.html","d51c3e972d1d53bc28eaaf7458446007"],["/bower_components/px-demo/px-demo-footer.html","73a7174d2d78c5fb4c1d3d5172a46f69"],["/bower_components/px-demo/px-demo-header.html","a406f3b964bdf33a0ff1cd9f2b92ac99"],["/bower_components/px-demo/px-demo-interactive.html","00b7fcf2137fdd2615a63a4b1fe63ff7"],["/bower_components/px-demo/px-demo-props.html","6c44bcd5711fe5d077c4ea3ab2760ba9"],["/bower_components/px-demo/px-demo-theme-switcher.html","57b7d6f067beedbdb913a030a0dcd360"],["/bower_components/px-demo/px-demo-theme-util.html","2b28702eda4ed98f72cc2f07ed8961a5"],["/bower_components/px-demo/px-demo.html","4b7d9b2d5b13961811ea7b38206fd157"],["/bower_components/px-icon-set/index.html","a4690caa0f6439a1887373c01bf3dccf"],["/bower_components/px-icon-set/px-icon-set-communication.html","7e42ee4deb524cf5bf7180125256262a"],["/bower_components/px-icon-set/px-icon-set-document.html","d44e4899a41bf881f4e4c7d46da9f4bd"],["/bower_components/px-icon-set/px-icon-set-feature.html","88d3415d7ff98cb2be4a3408e6014d7d"],["/bower_components/px-icon-set/px-icon-set-navigation.html","6b9fda637d03433c8a27da479c45203a"],["/bower_components/px-icon-set/px-icon-set-object.html","176877d17eafb7120a427949a269edc2"],["/bower_components/px-icon-set/px-icon-set-utility.html","ba71f3408e39d1ce6f4541cb2b962db9"],["/bower_components/px-icon-set/px-icon-set-vis.html","c1cb92bdcc364842d7a911d7e55313c4"],["/bower_components/px-icon-set/px-icon-set.html","d540c46ded29a840f4738192885b9dba"],["/bower_components/px-icon-set/px-icon.html","2729ca0a275a3e5bf07a7aef64ba6d79"],["/bower_components/px-spinner/css/px-spinner-styles.html","1823051dc66937fd41cf8ecc5eca2477"],["/bower_components/px-spinner/demo/px-spinner-demo.html","5e375df7a066b8413b41f07fd394daaa"],["/bower_components/px-spinner/index.html","596f64c4a34949e03b845e64a8434d53"],["/bower_components/px-spinner/px-modernizr.html","088c3ccdb499b115153f5ddc4bc16217"],["/bower_components/px-spinner/px-spinner.html","65c0186309360aaa3bb2698254e2b45f"],["/bower_components/px-spinner/test/px-spinner-test-fixture.html","f3ff819cc14faaf0db4522fc086bdc1d"],["/bower_components/px-theme/px-theme-styles.html","b2994e08470aaf98b51112f60fc5a3a7"],["/bower_components/px-toggle/css/px-toggle-styles.html","f74ebcec2402e206be4c0fc0d0d81404"],["/bower_components/px-toggle/demo.html","a63753ff468b447c389a411a7b4eab5f"],["/bower_components/px-toggle/demo/px-toggle-demo.html","fc3d40d3438b478f824aabee07ec8ad6"],["/bower_components/px-toggle/demo/simple_demo.html","972a69c95c8b286bf559c8f0930cd365"],["/bower_components/px-toggle/index.html","bf85508af82f29e3cd14368744f5c6be"],["/bower_components/px-toggle/px-toggle.html","a39d56e054e69e3c8556df7fb7eae464"],["/bower_components/webcomponentsjs/webcomponents-lite.js","761d3811879eb6cd7944c123045f93a3"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/css/predix-ui-hero-animation-icons-styles.html","b60493a790159ca7036ea553b914f0b0"],["/css/predix-ui-hero-animation-styles.html","1f7b95e93e954228fa46bec298c08429"],["/css/predix-ui-homepage-styles.html","286b04f500145448de692303e058b0b9"],["/css/px-catalog-code-styles.html","50c7a1a7dd59905aecf9b47c70dee320"],["/css/px-catalog-footer-styles.html","5802d4c9a29cb1cd6a5ab813042c2684"],["/css/px-catalog-page-styles.html","9b5c33f4351acfd8cbad96a5861815a7"],["/css/px-catalog-styles.html","356934bca4547ba9edff8fe831944b5d"],["/css/px-catalog-theme-styles.html","5d672cb036cee67ab5ae5959dcfb5034"],["/css/px-catalog-treenav-link-styles.html","4be33d6693d4dd4452a5790b49b5ea04"],["/css/px-catalog-treenav-styles.html","7969180f83193db8bc405d760986b0d0"],["/css/px-catalog-version-finder-styles.html","282394dea14cf3cc983f9624d3da9274"],["/css/px-hero-image-styles.html","a8a80da968dba1da1c648992c0399164"],["/css/px-sb-list-styles.html","6fd87e8617d3f1a99b9ddb48e46479e2"],["/css/px-sb-styles.html","c72c972d85f2935e7b44874a9ecaa2b6"],["/elements/px-catalog-page/px-catalog-page-behavior.html","03f288f07b7f1ddab8650a6ab7a69745"],["/elements/px-catalog-page/px-catalog-page-elements.html","f537d4ce2f02eb36500bce5b5730fd9a"],["/elements/px-catalog-router/px-catalog-router.html","5d64ed5367d85276b8976f77cd4f63aa"],["/elements/px-catalog-treenav/px-catalog-treenav-link.html","0e1ed7f5e678a4ac27271b8a0ef83aed"],["/elements/px-catalog-treenav/px-catalog-treenav.html","355d6276a1872ec45510fc9aacd0ed3b"],["/elements/px-catalog-version-finder/px-catalog-version-finder.html","93fb598735e3865ea3c9b0a1582c82b8"],["/elements/px-catalog-version-finder/versions.json","c529cfa353016f1fdf461af81a62f0a8"],["/elements/px-catalog/pages.json","eeeb326669001d9f0885c8ba6ac60d0d"],["/elements/px-catalog/px-catalog-page-viewer.html","528031c00775c1bc4456fed4c187d295"],["/elements/px-catalog/px-catalog-theme-switcher.html","0a535bfaa55a3ceb7429b825b40792eb"],["/elements/px-catalog/px-catalog.html","ada66ad1d3fbe08a3501508f48d72f03"],["/elements/px-hero-image/predix-ui-hero-animation-airplane.html","0c8add4ce04362d5cb141e6856895290"],["/elements/px-hero-image/predix-ui-hero-animation-chart.html","7054cc81a4d53b496b6f4a0086fcb2bd"],["/elements/px-hero-image/predix-ui-hero-animation-clouds.html","41694d9307b7edca03892d722bdd86c0"],["/elements/px-hero-image/predix-ui-hero-animation-gauge.html","d5cfcc5f75c2814e3ddab285faa76683"],["/elements/px-hero-image/predix-ui-hero-animation-turbine.html","46bc4bf915fd15716ac121987559270a"],["/elements/px-hero-image/predix-ui-hero-animation.html","c2c5fffcdbb70e715088444f6747f576"],["/elements/px-hero-image/px-hero-image.html","d1ce027fe672b653a4cbd731257981ec"],["/img/Github-seed-shot.png","7725f7d09e7a6c84ac27a431d9a68806"],["/img/Github-seed-shot.webp","b558a43d4950ff69a3536c9f9c7462cc"],["/img/Predix-UI-FavIcon_1024x1024.png","0938d184f0872838fc8334c60dfc3f95"],["/img/Predix-UI-FavIcon_1024x1024.webp","0274d2f3074699cf29b2568355ec62fd"],["/img/Predix-UI-FavIcon_128x128.webp","8f679d4efa228df6bd9cb84a03686b91"],["/img/Predix-UI-FavIcon_16x16.webp","5d49233fa6c898e5a4d5acc883b9ba6c"],["/img/Predix-UI-FavIcon_256x256.png","c334640e2dc9c412cc66372ac884f52e"],["/img/Predix-UI-FavIcon_256x256.webp","ee141265ab51dbf27069a59b49db343b"],["/img/Predix-UI-FavIcon_32x32.webp","4afc8ae0be98942b30153e5c422c54bd"],["/img/Predix-UI-FavIcon_512x512.png","5154393c05daddeb34b86e5f8b552bf7"],["/img/Predix-UI-FavIcon_512x512.webp","53b31130c5489f703ce93cf8ea449e57"],["/img/Predix-UI-Favicon_128x128.png","d1c395c71594a671ffe74aea99ff51f5"],["/img/Predix-UI-Favicon_16x16.png","a71adfbb7b45c026251e042243ecf222"],["/img/Predix-UI-Favicon_32x32.png","cffd907d8d50214b1deb868cdacc39a7"],["/img/browser_support.png","828be2ebc95a6d9e5f239af57d5e1b07"],["/img/browser_support.webp","c0c1dd85c11e7f9f7db0feab50f0c718"],["/img/conf_chart_1.png","42e18e9d74d5d00874a7978e68fff370"],["/img/conf_chart_1.webp","9c28c68de5b84f0ac3ee12c67b746787"],["/img/desktop_hero_bkd_dark.png","4eacf7c10c4f9e38b302bf69f7d7d4cb"],["/img/desktop_hero_bkd_dark.webp","b17bf5cca7e32620eda4a0863871f6d9"],["/img/desktop_hero_bkd_dark@2x.png","52a9213c956283f23924d892c764c6fd"],["/img/desktop_hero_bkd_dark@2x.webp","a01d791f74ffc134633ef274bc76c173"],["/img/desktop_hero_bkd_light.png","8b366bcc95dd9c16172351cef8fa568d"],["/img/desktop_hero_bkd_light.webp","82f6aba272a7baa960205c474270cbac"],["/img/desktop_hero_bkd_light@2x.png","02886a634ca78a110f3e5ba01fa314d0"],["/img/desktop_hero_bkd_light@2x.webp","31684190b0bf56a23d5a374a5e941b3d"],["/img/dtech-job-designsystem-blogpost.png","ff1bd9fa84641cb23a204ba0f7256573"],["/img/dtech-job-designsystem-blogpost.webp","4162c1ffa90bba4c5dbb1568f8205d39"],["/img/dtech-job-vis-blogpost.png","6c01cd6f86ae91209cbf6b4cfc259344"],["/img/dtech-job-vis-blogpost.webp","05ec83725de2ac92c67821363ab41141"],["/img/extents_1.png","4bfc7ab93dddcf8089ce093c98b70c40"],["/img/extents_1.webp","7e92cd04bf6ae37e04064bf9db872e83"],["/img/extents_default.png","c56f5b9b954bb2ef92467da5a1339381"],["/img/extents_default.webp","716cc18b766a5c9ce30f3419e67f348e"],["/img/extents_multi.png","7b739de9d76e341160d3e9910a8b7087"],["/img/extents_multi.webp","919b0e1b5a4a230c951ff3816200db21"],["/img/extents_y_dynamic.png","c82ea44cafa43ce6398d3a0035805125"],["/img/extents_y_dynamic.webp","9a8c52136454a7f0fafd7f36266652c5"],["/img/favicon.ico","601d347c6f5101ad51e6a69d5684dcab"],["/img/gallery/dashboard_dark.png","4201e7d2d80ba1cea5459c858b55d4e4"],["/img/gallery/dashboard_dark.webp","437858717c041a3352aa600a28ac7842"],["/img/gallery/dashboard_dark_top.png","33ac1a6c150126393b9210d0162c4938"],["/img/gallery/dashboard_dark_top.webp","31766cb722aff5e4b2a1465867db8605"],["/img/gallery/dashboard_light.png","d09ad2911538537ed6278c5aa3b11822"],["/img/gallery/dashboard_light.webp","8cd6bc3e3046a6355a3c13f290f09484"],["/img/gallery/filtered_list_dark.png","930f6c7d43cc24fb6885897547eec087"],["/img/gallery/filtered_list_dark.webp","e2a05326ae175578757e87e7ec5cc569"],["/img/gallery/filtered_list_dark_top.png","166f7544bc9cd83d18f026bd3b268f32"],["/img/gallery/filtered_list_dark_top.webp","fadb3405cfb03bb07178581ac7670a62"],["/img/gallery/filtered_list_light.png","5a2266db8eadba5f832792f3023f244a"],["/img/gallery/filtered_list_light.webp","afd8489e483ca54f1d6b67568a8c0498"],["/img/gallery/form_dark.png","f37efc59ee2ad5b0fc4dc1d6023c3bd5"],["/img/gallery/form_dark.webp","7b6a03b797c16617237723a9d543aa5f"],["/img/gallery/form_dark_top.png","2fee50637e3af89ac3f03e4e542353d5"],["/img/gallery/form_dark_top.webp","886dec82d98636a3544e60ce8cd696f2"],["/img/gallery/form_light.png","02e95108622e83294fb749d4d58994b2"],["/img/gallery/form_light.webp","5377d9911a9e8352957657a0c1393c25"],["/img/gallery/inbox_dark.png","d44407a8087fcd9d8686871628fc1749"],["/img/gallery/inbox_dark.webp","4f2b90ae94295d7a630852dfb4472c34"],["/img/gallery/inbox_dark_top.png","25c14877bb1fdde7c006ec7875b800b7"],["/img/gallery/inbox_dark_top.webp","078e4ded6d39954b6804e5370e809b98"],["/img/gallery/inbox_light.png","995146ca5bf18c5d10dc02e09aa45fbf"],["/img/gallery/inbox_light.webp","cc66d452a64a1995fd1a93a25d64a320"],["/img/gallery/tall_with_map.png","f00b0ab8f772e7db8af61eea77492280"],["/img/gallery/tall_with_map.webp","929c068ba54b5c09c605e34da4fa0553"],["/img/guidelines/4_column_example.png","a07bf0ba56c75d4e231119f61986e44f"],["/img/guidelines/4_column_example.webp","d7989c8ebfaa259e3f97919a05b87952"],["/img/guidelines/6_column_example.png","9e603a941b56b926110f423f7bfed8a5"],["/img/guidelines/6_column_example.webp","9c9e933e12a8c42cb921b974f405c7bb"],["/img/guidelines/area_chart_example.png","a051c56d84931f24fcf436d2bd6fa782"],["/img/guidelines/area_chart_example.webp","e298b88ffb5bff9730bcfeb257a2eaed"],["/img/guidelines/axis_lines_do.png","0c1201aa4fed9919b79ac4948560455a"],["/img/guidelines/axis_lines_do.webp","c8e91dd877256a0b04d6430e844ebcbf"],["/img/guidelines/axis_lines_dont.png","b5ea39f7c2ddc4a3cfe4f0fab0c4ecf4"],["/img/guidelines/axis_lines_dont.webp","1b350bb1b689453335e0713117cb0b5c"],["/img/guidelines/body_copy.png","b3782f3e6e9a3ec4aa09f817c015f2bc"],["/img/guidelines/body_copy.webp","bca1d8962260c206afa81af0646ec2c5"],["/img/guidelines/bold_no.png","896ef3d32548bee244385e6580beec6e"],["/img/guidelines/bold_no.webp","97a07b641752db355b5f3e2221a26bc9"],["/img/guidelines/bold_yes.png","b57c7621e74bf6a923e40b0f8615e470"],["/img/guidelines/bold_yes.webp","efae7d4a9856ea42bfc4d1a20aaf4df1"],["/img/guidelines/breadcrumbs.png","8fffdb331ca8b19d86bc82eb7f28d1be"],["/img/guidelines/breadcrumbs.webp","23f9c44fd3720c1bf577a59eb347be3d"],["/img/guidelines/card_1up.png","b79dd7e20f2d873979cfaf5f346da04c"],["/img/guidelines/card_1up.webp","efad76b9a7f63013365ef813d9698b0b"],["/img/guidelines/card_2up.png","b4cde036153972585c6ea80926511155"],["/img/guidelines/card_2up.webp","beeb681e3c9154fdbda6d66257efc10b"],["/img/guidelines/card_3up.png","b6af7f61051972c14abb176970822936"],["/img/guidelines/card_3up.webp","2fb7bd01a4a79a604aeb05ca5e8f56a3"],["/img/guidelines/card_example.png","e8e66a722b9bbec042a405babe2f6745"],["/img/guidelines/card_example.webp","6f5d8328617c93143d9dd828dba29653"],["/img/guidelines/card_example_redline.png","542658123c11d4e31cee795101e9ded3"],["/img/guidelines/card_example_redline.webp","60df051930b7c5f70de4eddbfcf75e88"],["/img/guidelines/cascade_do.png","423d3611da4094e2e3fb913ac399297a"],["/img/guidelines/cascade_do.webp","2d5b79b210a009da28e53403b0c7885f"],["/img/guidelines/cascade_dont.png","986c6ea2a0a0d1415a2bf94d8e9bd8e7"],["/img/guidelines/cascade_dont.webp","fe5e17b9ea348b4fe6a26fd696aa1811"],["/img/guidelines/color_do.png","4ff785c9b12039a93a9cb29a35ed3432"],["/img/guidelines/color_do.webp","365b9e18bfc8b4ea8d82fe7d5a5a9253"],["/img/guidelines/color_dont.png","f305fa1eb47d20ab6d2bc3cddf30a275"],["/img/guidelines/color_dont.webp","bc6f09e8a02817851abea5391a2b4e0b"],["/img/guidelines/combined_grid.png","40d010022d0c6f40fd29b72285f56674"],["/img/guidelines/combined_grid.webp","f5f97588ff360f882352aee429b1b990"],["/img/guidelines/content-nav-correct.png","d31c97992fe47345313090d9a6133103"],["/img/guidelines/content-nav-correct.webp","69c0e9f57f3da3e9d8b0a83cc99321bd"],["/img/guidelines/content-nav-incorrect.png","f765d125c57217dd2f8e64fddd496535"],["/img/guidelines/content-nav-incorrect.webp","f8cb767eb504a45c1061e7d075669a10"],["/img/guidelines/context-browser.png","957424bc3506582fb7cea826443811c0"],["/img/guidelines/context-browser.webp","fa99e71948fe1e075450e16270e116c7"],["/img/guidelines/contrast_chart.png","041e5570398bac16ffb0690625a8cd60"],["/img/guidelines/contrast_chart.webp","0465749e1a457ab9bdc7d9c6d53a5c1c"],["/img/guidelines/drop_down_nav.png","43a43cadc9fcd00ce051f78369f0082c"],["/img/guidelines/drop_down_nav.webp","f34d7db163cdaf7991942695557756c1"],["/img/guidelines/example_color_combinations.png","8b708c436b8568683e1e7ec90edc58cd"],["/img/guidelines/example_color_combinations.webp","a2136ee00632d4c6711ea3fde9ac6913"],["/img/guidelines/feature_icons.png","1b2282bf04cfa605f35fac51174578e5"],["/img/guidelines/feature_icons.webp","cc76f1efc3fbc76ba6d08f814a8e881d"],["/img/guidelines/four_column_grid.png","e11e836bc1c30643f619dcdc1141631a"],["/img/guidelines/four_column_grid.webp","b0ca54cfa7a29387ff9585965c2fdcb8"],["/img/guidelines/gauge_example.png","46ed47d4e0cb7d3407453ff3472f6711"],["/img/guidelines/gauge_example.webp","b2d0866fd4776d34535950ac21e4987b"],["/img/guidelines/horiz_bar_example.png","b43f15f4a721998561272d6edc48f9d7"],["/img/guidelines/horiz_bar_example.webp","1540004aa0ecf4cfc3b9fade61ba87a9"],["/img/guidelines/horizontal_layout.png","2a38c923fa8e1b9e005c2dd798dbc64a"],["/img/guidelines/horizontal_layout.webp","fcf72fda401639ffc55b3fd316a514e1"],["/img/guidelines/horizontal_nav.png","9742a4f1dcc5a1f6a85807b95c9d5962"],["/img/guidelines/horizontal_nav.webp","07b64a710595e2221c9793c512f84a6a"],["/img/guidelines/icon_color.png","5de2f3c2cb09b234ebb219b53169a1bb"],["/img/guidelines/icon_color.webp","8a979d0a6cf58e451127dee5682e7e08"],["/img/guidelines/icon_consistent.png","d22eb51c929e5bbfa89700c746193cb6"],["/img/guidelines/icon_consistent.webp","5a7aa6de587f87bd106728485cd2df39"],["/img/guidelines/icon_efficient.png","4ff1702dc129ee6867947c74ef0cb698"],["/img/guidelines/icon_efficient.webp","6ac53c58c71d46de98b5494223310a7b"],["/img/guidelines/icon_elegant.png","cc1edb584b3a9ac1bc2fe14afad2dbe1"],["/img/guidelines/icon_elegant.webp","10d379a7bda254a5115848f7902dcd0c"],["/img/guidelines/icon_purposeful.png","bd6b9437374f614eb115783915923f18"],["/img/guidelines/icon_purposeful.webp","2cb612ce847c3ca63fcfb25377128e0e"],["/img/guidelines/icon_style.png","0446c39249e4aca171eae2cad7afeaf6"],["/img/guidelines/icon_style.webp","37ac00e2da49a585bb2bedca44dc2a77"],["/img/guidelines/label.png","57fbe36515f6472bc7fd8730a519cfb9"],["/img/guidelines/label.webp","107475730c2fc362af2d7e9a08afb143"],["/img/guidelines/layering.png","48b2a98c2fce1dc77e05d6be47ad2ecb"],["/img/guidelines/layering.webp","8bc0c25b211d481fc169c6da23a8ac8c"],["/img/guidelines/layout_grid.png","54e352af0a29f7056f4cc7607d29af09"],["/img/guidelines/layout_grid.webp","75a93f84c75aeb3b575238992c6a037c"],["/img/guidelines/mobile_card.png","8b8cb705c5c1ab3fd62c4f9b3c7dc446"],["/img/guidelines/mobile_card.webp","4a615fe2382cd60549123b50c40986d7"],["/img/guidelines/mobile_data_table.png","b1b8a49d7f7655663b7a1ff86107d64e"],["/img/guidelines/mobile_data_table.webp","95d9f8c03519b829258a8c78893422c2"],["/img/guidelines/mobile_nav_dropdown.png","8f77b8098fed434aada50a4ca37fc0ab"],["/img/guidelines/mobile_nav_dropdown.webp","288a0f87bd55b9d0de6e190e3a3ae10d"],["/img/guidelines/mobile_nav_hamburger.png","70b7d05020396c29fd3682c485c04d78"],["/img/guidelines/mobile_nav_hamburger.webp","c9c7a6a0d41260f1c774ce774fdf90c6"],["/img/guidelines/mobile_swiping.png","2d2511d88d5f2865874b5a72ccaaefc6"],["/img/guidelines/mobile_swiping.webp","10e4dd97b8a50380f5ec1ba2e3054341"],["/img/guidelines/modal-correct.png","ef6369bf3a848dc4b49f0fcd2dfdbc38"],["/img/guidelines/modal-correct.webp","bb544f6a50fbb9060e59cb56966aeb0b"],["/img/guidelines/modal-incorrect.png","54afa0bc4a88f01368a94681d109b95d"],["/img/guidelines/modal-incorrect.webp","9ebe8d8d458a1ee914971717197d86ef"],["/img/guidelines/multi_column_example.png","af5190e59fd85609ee8e413a3ffc913e"],["/img/guidelines/multi_column_example.webp","904ceac82f1e4c44c309353fcf31b04f"],["/img/guidelines/navigation_icons.png","4a1284d156b6db39812d7a8e27a07b4e"],["/img/guidelines/navigation_icons.webp","e2ebded8d63f21154ed7346a8b730f25"],["/img/guidelines/navigation_space.png","c10d23bc70073ca2a2b06b6f1ee25d96"],["/img/guidelines/navigation_space.webp","f843bbcbf022adfa894cd03533b0c389"],["/img/guidelines/nesting_do.png","d23d39dc6cb46f16aafa31f7c15ad52b"],["/img/guidelines/nesting_do.webp","e3905579383efb588a3fd4c9873cd827"],["/img/guidelines/nesting_dont.png","480ba1f2aaf17e3c78205d81f5ef990f"],["/img/guidelines/nesting_dont.webp","f1a4166e18ea56064a8bc51ce6fd2913"],["/img/guidelines/page_header.png","e069e71dd775560461c736e479ea8f49"],["/img/guidelines/page_header.webp","816d76187bc4b15449be8165345b4251"],["/img/guidelines/parallel_axis_example.png","8a5dc10fd15a0d6107b5e79ef393ab1d"],["/img/guidelines/parallel_axis_example.webp","07c5ba8a96432784b63ef24ac6aa6c2b"],["/img/guidelines/parallel_coords.png","1271debc4c593e93a74d8a7da074581a"],["/img/guidelines/parallel_coords.webp","8e032efd7faf968b9c7d1a4f7c099ef6"],["/img/guidelines/percent_circle_example.png","f76da4d6ab5c91f068b1c745cc4b0bbd"],["/img/guidelines/percent_circle_example.webp","accd715b6e6c7b6ea675276f7220e904"],["/img/guidelines/pie_chart.png","2405f8b578d923cbead8e0e9c7b5a13c"],["/img/guidelines/pie_chart.webp","29310f807f862a4ed8b4be3fd4aa52ab"],["/img/guidelines/polar_example.png","3b23d11eaa98fd70d1d820b9f0ccce02"],["/img/guidelines/polar_example.webp","a0785390c430f1b2a05a2c8e9ceb0c52"],["/img/guidelines/radial_axis_do.png","a754c51e56a44a530146890275e7e941"],["/img/guidelines/radial_axis_do.webp","6acd8d64fe86aecb34b55ecb854b66ca"],["/img/guidelines/radial_axis_dont.png","1f67c6ed4eb5a09a3acf5e8748b118c0"],["/img/guidelines/radial_axis_dont.webp","dd66e271ad9d1d0c7c72bc9fe2f54bbd"],["/img/guidelines/scatter_plot_example.png","ce767d85e76d7a2435dd27db8d1feb52"],["/img/guidelines/scatter_plot_example.webp","5352b14724a202231bec4c4bbdd54d6e"],["/img/guidelines/section_header.png","eeb4da22f4c5f2633726097a9625bc29"],["/img/guidelines/section_header.webp","474bcb7a7e866c55057c6ed44743f4af"],["/img/guidelines/shadow_scale.png","f4d0c92d1246d70698cefb8b60433cc1"],["/img/guidelines/shadow_scale.webp","3640067b22272185af0f1bc0ca8f8039"],["/img/guidelines/shadow_scale_example.png","32e672a1ea94334bac59cbf0a3721847"],["/img/guidelines/shadow_scale_example.webp","63313115dfd25952764593d2c3baa116"],["/img/guidelines/simple_bar_example.png","7075f603318059d059c549f13ce97661"],["/img/guidelines/simple_bar_example.webp","f84e93d34d8ca7228bd12e5f44d57e1a"],["/img/guidelines/simple_line_example.png","c837bb146100e06f23eafd0e93e2effd"],["/img/guidelines/simple_line_example.webp","365111a9f65c46cd05526558dd4d57aa"],["/img/guidelines/single_column_example.png","e27bb331ef5c9b0ce533af8ef72db9fc"],["/img/guidelines/single_column_example.webp","5d631d520f6306224132790db02dc3d6"],["/img/guidelines/single_column_grid.png","0f39280362b7cd34a4f70724df55e0ab"],["/img/guidelines/single_column_grid.webp","1f95ccb7724fcd76b0c3b3b2cb910692"],["/img/guidelines/six_column_grid.png","fb80199033ea318b8fc9203c131ffa45"],["/img/guidelines/six_column_grid.webp","7be0f2ea404cd078c5c3564147fa5c54"],["/img/guidelines/spark_example.png","10f4018517b255fc138d48c335754a7e"],["/img/guidelines/spark_example.webp","3db098fdec812201b4c66c75d0e4fa3f"],["/img/guidelines/sub_section_header.png","a43f6ac3ae199a2fd4c8ee0cb7ee8653"],["/img/guidelines/sub_section_header.webp","b341d60c7b93a08417ad7839594eefac"],["/img/guidelines/subnavigation_1.png","a8124d7aa5d8e73fb00273103d97e39b"],["/img/guidelines/subnavigation_1.webp","e796160cdf93fc0af10d7f3ec9d06217"],["/img/guidelines/subnavigation_2.png","63b5635258f7fceacd95788edfb4f737"],["/img/guidelines/subnavigation_2.webp","ca0ff0e23b3e9679deeffde80b06a518"],["/img/guidelines/tabs-correct.png","e545dfd9fd681480087f417bd0482555"],["/img/guidelines/tabs-correct.webp","8ec97d6ae851197d7e66c7dd8e9ad236"],["/img/guidelines/tabs-incorrect.png","f8e96acc526ba96b4606a0ec8a184145"],["/img/guidelines/tabs-incorrect.webp","4fd42c8809d21822efe8ebef18bf959e"],["/img/guidelines/three_column_example.png","4cdf2a9a52442d435805a73fbf130c79"],["/img/guidelines/three_column_example.webp","a95b6bfb9659e387d4ff7f47fc1b8bac"],["/img/guidelines/three_column_grid.png","60f6bcd59b9d81b69d7d63650a5ba7ac"],["/img/guidelines/three_column_grid.webp","ba842ee8b56d910379de5ff6a04b0295"],["/img/guidelines/time_series_example.png","aa05fa34b6defd3668567ebc5d1a3e29"],["/img/guidelines/time_series_example.webp","7a74ab1bfa09b5a0315a26c5e81cf135"],["/img/guidelines/two_column_grid.png","e13667164912945274961395b3241e05"],["/img/guidelines/two_column_grid.webp","2d765e0781ad0b7754339be393555101"],["/img/guidelines/type_hierarchy_dont.png","d0d5fd4da53031431d7185abc097e6ac"],["/img/guidelines/type_hierarchy_dont.webp","8ad4560d34161143a6e318d5ced6bd4f"],["/img/guidelines/type_hierarchy_good.png","88fb24e952aaab6249e4bdc602605550"],["/img/guidelines/type_hierarchy_good.webp","1513a5278b5377e3398cdad702a410a6"],["/img/guidelines/type_sizes.png","4ea1f9a20658f531f6c8b7685fc92656"],["/img/guidelines/type_sizes.webp","f50fe5550366a869932857cb1ea2262e"],["/img/guidelines/utility_icons.png","562b7fd91ef9df30bf7fb612f0e58418"],["/img/guidelines/utility_icons.webp","58e26341b0f20de2e3697515a2716e41"],["/img/guidelines/vertical_layout.png","1b4416ac341d325e6ecf0d07a5c29c9b"],["/img/guidelines/vertical_layout.webp","d8201f081074f5488244c92594fdda13"],["/img/guidelines/vertical_nav.png","7910bcbc449399a2b4d4b74e9e70c54e"],["/img/guidelines/vertical_nav.webp","82637086b8ba1b9442dc290f2dd602d9"],["/img/guidelines/vis_color_do.png","1cca5c5694d2e09164f0ca7b5aa33d9a"],["/img/guidelines/vis_color_do.webp","1d1a0ebe758174abb2f8a334af12b7cd"],["/img/guidelines/vis_color_dont.png","57385c226b273c37dfa2cf81d1bc9a2b"],["/img/guidelines/vis_color_dont.webp","77ef17657721f756f5732367a5c56b33"],["/img/guidelines/vis_opacity_do copy.png","e8efbb4c4573374664f265b13775d9e6"],["/img/guidelines/vis_opacity_do copy.webp","df9c3bb8864ecb7fd9eb0a1ea90cbe91"],["/img/guidelines/vis_opacity_do.png","c9c373178da45086a8a5e75e1b4a012c"],["/img/guidelines/vis_opacity_do.webp","bc80b4b1b3c56ff20807acfe4e375c3b"],["/img/guidelines/vis_opacity_dont.png","13865fcdffc78946d8de5e48c6c704d9"],["/img/guidelines/vis_opacity_dont.webp","9e3e9a99d9bc6a40b6b0fe0a6cc5120d"],["/img/guidelines/vis_register_do.png","da6bb7df67fcc3a9e903a6bb25917a88"],["/img/guidelines/vis_register_do.webp","c877d8133cf4e6e00529680f98f38835"],["/img/guidelines/vis_register_dont.png","b5c22dae2275be2c61efdb58abd431f8"],["/img/guidelines/vis_register_dont.webp","581bbf64e5557759306de22c19b56291"],["/img/guidelines/vis_toolbar_do.png","525c513df520c2e7c6d0002cbfff8159"],["/img/guidelines/vis_toolbar_do.webp","60e79a832dd9dcd644670dfb5038b6e6"],["/img/guidelines/vis_tooltip_do.png","525c513df520c2e7c6d0002cbfff8159"],["/img/guidelines/vis_tooltip_do.webp","60e79a832dd9dcd644670dfb5038b6e6"],["/img/guidelines/vis_tooltip_dont.png","e0f68ce36722daa491b46ef686a8a26f"],["/img/guidelines/vis_tooltip_dont.webp","2a63666214def31711cf6ce5a97a3b11"],["/img/guidelines/win_loss_example.png","b788372d32144bedd81f0124147a7014"],["/img/guidelines/win_loss_example.webp","a2bb32c8a348e9dd0818a0bbf28edf9e"],["/img/guidelines/xaxis_do.png","d0c5915db4a326b7f786d751a448caa2"],["/img/guidelines/xaxis_do.webp","b858fd33b98cf2e6ec63cf91bfdf576e"],["/img/guidelines/xaxis_dont.png","2e4018aff8d7bb9db1323297f24c2946"],["/img/guidelines/xaxis_dont.webp","fda092e2b287edd0e0cfa097939a2be9"],["/img/guidelines/xy_example.png","99ca0cfb68e40a2db1c50872f301d9bc"],["/img/guidelines/xy_example.webp","98b3f6a27543f00c968d09327ccbfdbb"],["/img/guidelines/yaxis_do.png","e244cabc033707eaac46879e37e63aec"],["/img/guidelines/yaxis_do.webp","ecd773e5139337d34be4586c1ddbc5f9"],["/img/guidelines/yaxis_dont.png","539430bb6176ebd2c028246890c17760"],["/img/guidelines/yaxis_dont.webp","ac90aeb66c3c90221b5449c7fed60cf7"],["/img/include_all_series.png","81f0b8e1191f778ef4c431e25f11e9c9"],["/img/include_all_series.webp","3051d5221d7698df5adf87c318995c32"],["/img/inuit.png","4b856e8f978c63b614bf820e28429139"],["/img/inuit.webp","67552ea5df469b72567578746ba346ec"],["/img/mobile_hero_bkd_dark.png","3fb14b70e2a1c63140430c5945ce4d16"],["/img/mobile_hero_bkd_dark.webp","f8641522d462998c90b575dea6beb409"],["/img/mobile_hero_bkd_dark@2x.png","c1973ee821da05d9d8b30e6fc25180d3"],["/img/mobile_hero_bkd_dark@2x.webp","7112d4824292c81a4513725900c79432"],["/img/mobile_hero_bkd_light.png","64967b2d0e5f8fb182cb285f993eef17"],["/img/mobile_hero_bkd_light.webp","a57f33f0971593c91cfb8414cf62bfb9"],["/img/mobile_hero_bkd_light@2x.png","c08bc3a9551eace37397cc5177109009"],["/img/mobile_hero_bkd_light@2x.webp","78386998258d5010c2b8e893b3c25952"],["/img/mobile_hero_dark.png","11b919a4f43d5e554f7bc07eba3d1267"],["/img/mobile_hero_dark.webp","5ffa2991ffd7c3adb8c38850bd0ea39b"],["/img/mobile_hero_dark@2x.png","ebff41da46171e400a0ae99603c4460f"],["/img/mobile_hero_dark@2x.webp","7d52df95ba0a3929f9284f2f48b2c75d"],["/img/mobile_hero_light.png","bf5a72c2410db9b258e8df455223b986"],["/img/mobile_hero_light.webp","09661df78c0b535eeb98e9e111b420ea"],["/img/mobile_hero_light@2x.png","a1fc241d9432aa4207b2f258cb979874"],["/img/mobile_hero_light@2x.webp","ba7d11e6faa07841ec03e012eb781e33"],["/img/monogram-wdmk.png","2f6824f06c05628be996ebb4383e4863"],["/img/monogram-wdmk.webp","79b9f7e6768069d960f861b8526bc889"],["/img/ordinal_extents.png","2b12f50f92643113fb40b8e1fcdd93b3"],["/img/ordinal_extents.webp","83d099d1e66177bafe44890da2d1faae"],["/img/polymer_logo.jpg","c380b256bfa5afd306f16a31b482af93"],["/img/polymer_logo.webp","859107643bf34fef842a9088fe068000"],["/img/predix_ds_logo.png","ec644fd1636d25a6236030b50301c43f"],["/img/predix_ds_logo.webp","4810e6b275afc454f6bfd7e7bcf37a43"],["/img/predix_ds_logo@2x.png","9fb579fa23f111241394bafe4b6aef57"],["/img/predix_ds_logo@2x.webp","e6c0e62048de2a399651fb194725b271"],["/img/predix_ds_logo_dark.png","ce872be41f8b961aa54ea243504f3b13"],["/img/predix_ds_logo_dark.webp","ca7a6132f04d73b8b9478a673c389f36"],["/img/predix_ds_logo_dark@2x.png","f09eee718de4464426941b4a7347e731"],["/img/predix_ds_logo_dark@2x.webp","da5121369c6d7d0748a0f3bbb97f9ef0"],["/img/predix_logo.png","918cb1d905db163f223ed814ea24e128"],["/img/predix_logo.webp","37c6b73b00d60d182cc0506ba105d0de"],["/img/px-dev-logo.png","05c5111b5dd779af37d591389532d13d"],["/img/px-dev-logo.webp","f7e1e48035b26441b15a2bdf617b2719"],["/img/px_banner.png","bf18ff898fbb92b5ccb98afd8de4d9ca"],["/img/px_banner.webp","f64626f207dde2989b4f6c601c46cb11"],["/img/px_banner2.png","dc3cfb3333cd100d246670d087033f9c"],["/img/px_banner2.webp","3beadba5a217f043074c054e1e384801"],["/img/px_icon_apps.png","493645b480b45276c4a3d6d6a1c10254"],["/img/px_icon_apps.webp","304aed5308f581dc527facdf16a9260b"],["/img/px_icon_code.png","c2fb0e0d600c6aa5f5d5d619888fb0bc"],["/img/px_icon_code.webp","675bbd64287c906c033310c7515ec22d"],["/img/px_icon_web.png","35f1e8c61c3b47c6ec4931e3e98c22dc"],["/img/px_icon_web.webp","393d04b43fdecdbb5312952d84ca38f0"],["/img/px_logo.png","7413154bfe3e964c328e02155d587836"],["/img/px_logo.webp","82f66df5a34e6c92b315278cec42a929"],["/img/sketch_logo.png","403488485650492276bb220989b94f55"],["/img/sketch_logo.webp","759fe94aa261a1cb98029a25cc035ab6"],["/img/sketch_logo2.png","ca8ceb7a3616e5b6371e67827f4720c5"],["/img/sketch_logo2.webp","210260628033b36897ac3209fa3d7cea"],["/img/sketch_stencil.png","7715e46be4c6a9fca2c1c0cf5613e01e"],["/img/sketch_stencil.webp","ba0b15e88726bc1b0a3940afcb266b1a"],["/img/time_series_3d.png","b1991c60adc90882865c81a254c111bb"],["/img/time_series_3d.webp","3c57c775b6c7a8480cc03ed8edc45c82"],["/img/using_the_system.png","d6e8dcd273c65606ac662972be3866b6"],["/img/using_the_system.webp","3526247c712f3fd66aaddb7e5b80f118"],["/img/webSocket.png","e0a375f55fb86283b872082b5d26ff0d"],["/img/webSocket.webp","6b8607f0153ffa7082d13435f1739048"],["/img/web_components.png","f77280ead4fff03115627a22d1e262d2"],["/img/web_components.webp","2181851e56ff4ee3a2d36e4d0867d75d"],["/index.html","8aa3281ede6d7c3e5b4d01b3586c108b"],["/manifest.json","b3547be8c2266b11745bb994f7e90692"],["/pages/about/introduction.html","e1cc75ffa44f50aab39cde79f58c29e5"],["/pages/about/release-notes.html","950805ca9b86ca67fc4d970dfac4c96f"],["/pages/about/resources.html","52b533ad45613511607891e8191f24c6"],["/pages/about/start-designing.html","0b4403f1f1651fb9399a0573e50921a0"],["/pages/about/start-developing.html","cb67bb2270cefcbdd3deb388e814e0a9"],["/pages/app-data.json","ebe46c129bfbc6a55cf8a7d938c0384a"],["/pages/build-data.json","9ac7f6f0adb59a118af1270404d6279b"],["/pages/design/Predix_Iconography_Guidelines.pdf","fa95212f14ccd2718637cdce132859fe"],["/pages/design/data-vis.html","d6447772b366a08a8292c4f960546459"],["/pages/design/design-principles.html","5dd413f0f85cdd818952ebbc8c91761a"],["/pages/design/elevation-layering.html","47674506735149e66bd7c1f49bf6279d"],["/pages/design/gallery.html","93d8ba57215a872fe4191a6900c6b682"],["/pages/design/iconography.html","e6f21ad845ae01c1e849179b171f15c0"],["/pages/design/materiality.html","24b701e19289bbf9d2de4d3b72e76435"],["/pages/design/mobile.html","2cc6b0fcbff1653f59e0d2e23c59e212"],["/pages/design/navigation.html","1f0a00e5b953038c8925053e0d79224f"],["/pages/design/page-layout.html","200e4636ccf95d084023965b7d1b18c0"],["/pages/design/typography.html","a0b7063fda7b0a6aecd6e4878e13dfef"],["/pages/develop/contribution.html","2c56d7b7fe95bce7783d87f1c97c3cfd"],["/pages/develop/internationalization.html","03a3c4cf0972a0803d89eeec9d7d7110"],["/pages/develop/localizable-strings.html","c66bb4171d22f238f788c858084c06a8"],["/pages/develop/migrate/icons.html","d7eb7e2bee93af6cb3c27695ccc8950d"],["/pages/develop/migrate/img/chart-themed.png","bc90ea98cc7db126b06f7289790c6cda"],["/pages/develop/migrate/img/chart-themed.webp","ae3fe659ff7b90ff3c0a874975994cf6"],["/pages/develop/migrate/img/chart-unthemed.png","37d35e37f4ec816e752036d514b66d57"],["/pages/develop/migrate/img/chart-unthemed.webp","aa17fd617f90899bd4c7e23e63371090"],["/pages/develop/migrate/img/slider-themed.png","106052d08efb88794f4a05b14812da4c"],["/pages/develop/migrate/img/slider-themed.webp","f5f887879e7612db8d0967316ac2c6e0"],["/pages/develop/migrate/img/slider-unthemed.png","52e5affd1963d54766847d2a89cd2af8"],["/pages/develop/migrate/img/slider-unthemed.webp","a281c2b4f3f0cd2ec38977dd905cf101"],["/pages/develop/migrate/theme.html","e0ec1841703e0de986d27bdee806adf1"],["/pages/develop/migrate/vis.html","12bc74ecbf6ce66e9d0c8fe4d3cbee1f"],["/pages/develop/mobile.html","935b80006ef64da5a19803f4e2e6849b"],["/pages/develop/vis/configure-charts.html","9e0b80f356cbee6ec36edbf5b5d872ce"],["/pages/develop/vis/configure-toolbar.html","3ea5e7ef57fc73df7ac83b07510fcb6f"],["/pages/develop/vis/crosshair.html","606c4e28bf002807f82c2c624eb041f7"],["/pages/develop/vis/framework-overview.html","b809ced03e9410db0b858fe2e86dc689"],["/pages/develop/vis/terminology.html","8186c40da47c4b5dd566c0ed7dc4e8ec"],["/pages/develop/vis/vis-resources/4_millions.gif","78d8830f77d4e8030521bb82a722f756"],["/pages/develop/vis/vis-resources/4_millions_old.gif","09b1f694c7c1883671cdf863bf6fd1ed"],["/pages/develop/vis/vis-resources/TS_basic.png","6529cc78abfc1a1900598e3cfe5b1e04"],["/pages/develop/vis/vis-resources/TS_basic.webp","f846c8bf8abdd8e1fa5595c43b68ea0d"],["/pages/develop/vis/vis-resources/brushes.png","9aa9d2b510b94b2b7dcaf6809cb0e598"],["/pages/develop/vis/vis-resources/brushes.webp","15cf6569d34ce45a1a81e62a6c3d0c9c"],["/pages/develop/vis/vis-resources/chart_navigator.png","165e92d87716f3f684fb67b1bff9d313"],["/pages/develop/vis/vis-resources/chart_navigator.webp","40d6b74e3bb74c1d8e43c62e9803e368"],["/pages/develop/vis/vis-resources/conf_chart_1.png","42e18e9d74d5d00874a7978e68fff370"],["/pages/develop/vis/vis-resources/conf_chart_1.webp","9c28c68de5b84f0ac3ee12c67b746787"],["/pages/develop/vis/vis-resources/crosshair.png","df8a63318a01f57486716ab7439a380c"],["/pages/develop/vis/vis-resources/crosshair.webp","dccede51741badb9dac89b9f0eef4839"],["/pages/develop/vis/vis-resources/cursor.png","a9ee473af93c61cdc6326f32278b7bd3"],["/pages/develop/vis/vis-resources/cursor.webp","ef5043b999406769dde362cd98569a50"],["/pages/develop/vis/vis-resources/dynamic_menus.png","1b246e416b4a6e97779d68738478945d"],["/pages/develop/vis/vis-resources/dynamic_menus.webp","79e72e4d1db4ef4c08480fcbaa5d1f79"],["/pages/develop/vis/vis-resources/event.png","86bd885fecd0bde61494a6879145d57c"],["/pages/develop/vis/vis-resources/event.webp","bcdc59f057166e89a1f223063c43cbc1"],["/pages/develop/vis/vis-resources/extents_1.png","4bfc7ab93dddcf8089ce093c98b70c40"],["/pages/develop/vis/vis-resources/extents_1.webp","7e92cd04bf6ae37e04064bf9db872e83"],["/pages/develop/vis/vis-resources/extents_default.png","c56f5b9b954bb2ef92467da5a1339381"],["/pages/develop/vis/vis-resources/extents_default.webp","716cc18b766a5c9ce30f3419e67f348e"],["/pages/develop/vis/vis-resources/extents_multi.png","7b739de9d76e341160d3e9910a8b7087"],["/pages/develop/vis/vis-resources/extents_multi.webp","919b0e1b5a4a230c951ff3816200db21"],["/pages/develop/vis/vis-resources/extents_y_dynamic.png","c82ea44cafa43ce6398d3a0035805125"],["/pages/develop/vis/vis-resources/extents_y_dynamic.webp","9a8c52136454a7f0fafd7f36266652c5"],["/pages/develop/vis/vis-resources/include_all_series.png","81f0b8e1191f778ef4c431e25f11e9c9"],["/pages/develop/vis/vis-resources/include_all_series.webp","3051d5221d7698df5adf87c318995c32"],["/pages/develop/vis/vis-resources/ordinal_extents.png","2b12f50f92643113fb40b8e1fcdd93b3"],["/pages/develop/vis/vis-resources/ordinal_extents.webp","83d099d1e66177bafe44890da2d1faae"],["/pages/develop/vis/vis-resources/register.png","12fc4dc362e9b95ae110675e88e2513c"],["/pages/develop/vis/vis-resources/register.webp","1ec407d592089105e16e3a0c4a96c036"],["/pages/develop/vis/vis-resources/series.png","2dcddf6f276ceba6b80a862e5e669de0"],["/pages/develop/vis/vis-resources/series.webp","01ec59ae367077f5547bb1bee0cefcba"],["/pages/develop/vis/vis-resources/thresholds.png","465b4736453659dbd7fa7eff8f6a745b"],["/pages/develop/vis/vis-resources/thresholds.webp","f544b8d74fd8991e7b1a0f18921618c8"],["/pages/develop/vis/vis-resources/toolbar.png","da48701683443ca9b40fd4a1550ffe70"],["/pages/develop/vis/vis-resources/toolbar.webp","ed9a9dd9e5527798bea8f007682bc61f"],["/pages/develop/vis/vis-resources/toolbar_data.json","b71c8fc843134875c54dea8a27d25324"],["/pages/develop/vis/vis-resources/visual_qt_optimized.gif","3c106a27802f6cfb93be6024f1c8064b"],["/pages/develop/vis/web-workers.html","7267cefcbda191bf9175d76489fa295d"],["/pages/home.html","b863b331bcb8bba6594ebd339fb1d090"],["/pages/tools/version-finder.html","84f82de9e64e2cc883b9b7582082762f"],["/type/GEInspiraSans-Bold.eot","76ed48fc07259af776ed63253194a1bf"],["/type/GEInspiraSans-Bold.svg","c88faaefab3e7c6afc481190d77c3b94"],["/type/GEInspiraSans-Bold.svgz","a4800690c3ca1721bdd8b7f3bc498a6d"],["/type/GEInspiraSans-Bold.ttf","74d32c6b887369a416327bf803fc885f"],["/type/GEInspiraSans-Bold.woff","2e53145e77ccfd1ab1b30076782adb56"],["/type/GEInspiraSans-Bold.woff2","a85d4c51fda3747ae393555efec8bc69"],["/type/GEInspiraSans-BoldItalic.eot","1e01b72d96a3c6d2db320cabc0c2818e"],["/type/GEInspiraSans-BoldItalic.svg","906d7807743934e8eefc104d53900275"],["/type/GEInspiraSans-BoldItalic.svgz","e46f94795c4d4d94ba3daf9b21a45dc9"],["/type/GEInspiraSans-BoldItalic.ttf","4cd1a6d1c933bedec92b06025be3b9ed"],["/type/GEInspiraSans-BoldItalic.woff","f5222dfa3e2f8c6ab178130e79e5a938"],["/type/GEInspiraSans-BoldItalic.woff2","1928a59996e51036320718c0a1b7d427"],["/type/GEInspiraSans-Italic.eot","58cef27cba3b88704f9bdf83946b8c46"],["/type/GEInspiraSans-Italic.svg","7f7d36798d52af5fb69fa535b07baf32"],["/type/GEInspiraSans-Italic.svgz","583f3302fcde887ceb6c1697901dff94"],["/type/GEInspiraSans-Italic.ttf","16bf3a90afe693ca20d1d125303dd65a"],["/type/GEInspiraSans-Italic.woff","4389f2fffc6683de1defcbac2b264ac3"],["/type/GEInspiraSans-Italic.woff2","640ea5c2135498739950c4cffbbbcd8d"],["/type/GEInspiraSans.eot","268234e728bca77250a0a95fbfb8b66e"],["/type/GEInspiraSans.svg","83bd30add447f3ade981d09c19dbe8d7"],["/type/GEInspiraSans.svgz","9432299021b1db7e9f1084f8e4bdb67f"],["/type/GEInspiraSans.ttf","4e2e3ae31004c38b2b4d903bcbc942b0"],["/type/GEInspiraSans.woff","a443694e5dd43b3ced15bee2a1a67366"],["/type/GEInspiraSans.woff2","7fabd773b5033881cd909da1ca34b275"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([null], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







