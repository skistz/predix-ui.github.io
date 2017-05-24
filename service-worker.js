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

var precacheConfig = [["/bower_components/app-route/app-location.html","40fe423ff50b4d7ac8a8df5088b4430b"],["/bower_components/app-route/app-route-converter-behavior.html","dccecb824d90a3e92a4305aaa87f060c"],["/bower_components/app-route/app-route-converter.html","db54435e473ad02484efaa15c121c927"],["/bower_components/app-route/app-route.html","773be00ce4599a9fdc9935409536a053"],["/bower_components/font-awesome/fonts/fontawesome-webfont.eot","45c73723862c6fc5eb3d6961db2d71fb"],["/bower_components/font-awesome/fonts/fontawesome-webfont.svg","76a4f23c6be74fd309e0d0fd2c27a5de"],["/bower_components/font-awesome/fonts/fontawesome-webfont.ttf","7c87870ab40d63cfb8870c1f183f9939"],["/bower_components/font-awesome/fonts/fontawesome-webfont.woff","dfb02f8f6d0cedc009ee5887cc68f1f3"],["/bower_components/font-awesome/fonts/fontawesome-webfont.woff2","4b5a84aaf1c9485e060c503a0ff8cadb"],["/bower_components/hydrolysis/hydrolysis.html","72f4ead6b9e0ab0c57605e0574f29c99"],["/bower_components/hydrolysis/hydrolysis.js","82148eeaaf0519efbc445de7ada47dbc"],["/bower_components/iron-ajax/iron-ajax.html","2014ea7dc1d2d417afa9f488cff74382"],["/bower_components/iron-ajax/iron-request.html","0a08085e796bed6171caef37a6b12257"],["/bower_components/iron-collapse/iron-collapse.html","459379585b3fdcd450864157375ad376"],["/bower_components/iron-flex-layout/iron-flex-layout.html","c842503c86f6b4c1b925fdfce0300f29"],["/bower_components/iron-icon/iron-icon.html","d0fdbd53c2fd32d006fed39a245e43aa"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","55fc819d7862ea158f8b58b0dff3d67d"],["/bower_components/iron-location/iron-location.html","98da56b2fc2557d3ddbe035c0189b632"],["/bower_components/iron-location/iron-query-params.html","6dd5d44fbaee1121a5068d69233b1c41"],["/bower_components/iron-meta/iron-meta.html","7c6822b1fb9f3b07ca501087b0feda2f"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","cbed592a1eea3350b22a54bf2fda268b"],["/bower_components/polymer/polymer-micro.html","e468c439567926cbb06f2f1adc600822"],["/bower_components/polymer/polymer-mini.html","b22f4c983047b07bf3a0b844b1f55250"],["/bower_components/polymer/polymer.html","4ce72be3c73de991c14562634d99f5a3"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","965c7e4a3b59ae6da112c36ef7fcaeb6"],["/bower_components/px-demo/css/px-demo-code-editor-styles.html","bdbb6866d4a7900e4aa9069d192e3a36"],["/bower_components/px-demo/css/px-demo-styles.html","b8563d29e7d580239a1eeec78cc7f92c"],["/bower_components/px-demo/index-dark-theme.html","6abe3bfbefe31302d7582f6a24999767"],["/bower_components/px-demo/index.html","329606948c21c7654bc7667ab1886942"],["/bower_components/px-demo/px-demo-api-viewer.html","ab2d9c0a5cd7e151df91477ac86e33c9"],["/bower_components/px-demo/px-demo-behaviors.html","b1c729db188f5f6b51dad2b1527464e9"],["/bower_components/px-demo/px-demo-code-editor.html","342f3f1921960e5789a92d7306e822a4"],["/bower_components/px-demo/px-demo-collection.html","b5587ef2a548619f729be2f440413037"],["/bower_components/px-demo/px-demo-component-snippet.html","590ba8bb8955ff47eea9a562c00d2397"],["/bower_components/px-demo/px-demo-configs.html","544c9a73bb000f34cc5ef6829fa5f321"],["/bower_components/px-demo/px-demo-footer.html","0d0d956f66e7f03e4c7e45c5c36d26cf"],["/bower_components/px-demo/px-demo-header.html","4049398ec474708afec6eddefe06953c"],["/bower_components/px-demo/px-demo-interactive.html","1f5761ae33c9b1b166d489167b1ac1d7"],["/bower_components/px-demo/px-demo-props.html","3a5195ca16b3312f6d1cc8d7a8ba6202"],["/bower_components/px-demo/px-demo.html","e3ebeb512179c9eb9b6585307c49c7ad"],["/bower_components/px-polymer-font-awesome/polymer-font-awesome.html","e6d9b26dd818e21bf95c1e7ab81024d3"],["/bower_components/px-polymer-font-awesome/px-polymer-font-awesome.html","90f006398ddba448ce4f235766142f70"],["/bower_components/px-spinner/css/px-spinner-styles.html","fbbc829c66afced3826275036c6bfa20"],["/bower_components/px-spinner/demo/index.html","4d833b30479758c1ee3d65cda9ffb32c"],["/bower_components/px-spinner/index-dark-theme.html","407219bd5355b6f6a713c69df403c71a"],["/bower_components/px-spinner/index.html","60225ea36f1830f13343f3bf4fd08138"],["/bower_components/px-spinner/px-spinner.html","e7e2526f6b33f9805e8d0789cb183db0"],["/bower_components/px-spinner/test/px-spinner-test-fixture.html","63284553aae3e1db97ceec8166c3d1f5"],["/bower_components/px-theme/px-theme-styles.html","42ea6b718d1218cb597c2897c81a9c70"],["/bower_components/webcomponentsjs/webcomponents-lite.js","761d3811879eb6cd7944c123045f93a3"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/css/predix-ui-styles.html","443120b1715d76456d7f3ff793030d0b"],["/css/px-catalog-footer-styles.html","1d77f6daef235977e771ed0963a6dcdd"],["/css/px-sb-list-styles.html","80a6371174ad365579a543773f730819"],["/css/px-sb-styles.html","f900c9601a2f0c0ae527c60be2c14e3b"],["/elements/px-catalog-footer/px-catalog-footer.html","749a4b04ee30f94c906b5ff3eee1d238"],["/elements/px-catalog-router/px-catalog-router.html","240a59ebe1f80d7c63e2409a89e31854"],["/elements/px-catalog-sidebar/px-sb-list.html","84c5b968c872fbb4ff31f2df0eceb05f"],["/elements/px-catalog-sidebar/px-sb.html","6c32c10bc6131b2efcf9e287b90c9cd8"],["/elements/px-catalog/navigation.json","871719f07080823d6c9d2396af164796"],["/elements/px-catalog/px-catalog.html","35cbd86b5b4b3eefa67ca81ae53c4544"],["/img/Github-seed-shot.png","7725f7d09e7a6c84ac27a431d9a68806"],["/img/Predix-UI-FavIcon_1024x1024.png","0938d184f0872838fc8334c60dfc3f95"],["/img/Predix-UI-FavIcon_256x256.png","c334640e2dc9c412cc66372ac884f52e"],["/img/Predix-UI-FavIcon_512x512.png","5154393c05daddeb34b86e5f8b552bf7"],["/img/Predix-UI-Favicon_128x128.png","d1c395c71594a671ffe74aea99ff51f5"],["/img/Predix-UI-Favicon_16x16.png","a71adfbb7b45c026251e042243ecf222"],["/img/Predix-UI-Favicon_32x32.png","cffd907d8d50214b1deb868cdacc39a7"],["/img/favicon.ico","601d347c6f5101ad51e6a69d5684dcab"],["/img/inuit.png","4b856e8f978c63b614bf820e28429139"],["/img/monogram-wdmk.png","2f6824f06c05628be996ebb4383e4863"],["/img/polymer_logo.jpg","c380b256bfa5afd306f16a31b482af93"],["/img/px_banner.png","bf18ff898fbb92b5ccb98afd8de4d9ca"],["/img/px_icon_apps.png","493645b480b45276c4a3d6d6a1c10254"],["/img/px_icon_code.png","c2fb0e0d600c6aa5f5d5d619888fb0bc"],["/img/px_icon_web.png","35f1e8c61c3b47c6ec4931e3e98c22dc"],["/img/px_logo.png","86e0bfdf2831c565f8b97d8a88168e2a"],["/img/time_series_3d.png","b1991c60adc90882865c81a254c111bb"],["/img/webSocket.png","e0a375f55fb86283b872082b5d26ff0d"],["/index.html","0dbbd7d0a0fe601be28bef43d5929b3e"],["/manifest.json","b3547be8c2266b11745bb994f7e90692"],["/pages/about/what-is-predix-ui.html","a5b1ac27a0663f8bc02fec88c21e4a55"],["/pages/contributing.html","2408715227cc508b5d940a46615408b8"],["/pages/guides/getting-started.html","d1565d26585ffb1710004824b7c5ec53"],["/pages/guides/use-component-generator.html","f7dbeb2fc0a480e638b5aa55b741bda4"],["/pages/guides/use-css.html","6429611191d1979198357ec07341bcbf"],["/pages/guides/use-seed.html","f59595df9f0763d163ffc37dc422a03a"],["/pages/home.html","7100e1c4252677665b4a31ca1454e23a"],["/type/GEInspiraSans-Bold-v01.eot","3ece5fb565c778d8927acc4b2b809636"],["/type/GEInspiraSans-Bold-v01.svg","80d3b6332937eec46d8b6ae1f5367e76"],["/type/GEInspiraSans-Bold-v01.ttf","bf1a0a684b461d7671a97848549726c1"],["/type/GEInspiraSans-Bold-v01.woff","eb2c300821907d598c460841ae0feb86"],["/type/GEInspiraSans-BoldItalic-v01.eot","4ec4a09887d570e6651752a34cdb53e9"],["/type/GEInspiraSans-BoldItalic-v01.svg","e5ef88c3ff15b4b48624a4112659cf28"],["/type/GEInspiraSans-BoldItalic-v01.ttf","20fb887c83f524c0ffe6449ff504b8df"],["/type/GEInspiraSans-BoldItalic-v01.woff","09b3024dedc6c4323e72913cc9fe3011"],["/type/GEInspiraSans-Italic-v01.eot","59c2dde875a905d2029ed8fd95bbb510"],["/type/GEInspiraSans-Italic-v01.svg","9a47087d06f400f59a7a7c19faeb98ab"],["/type/GEInspiraSans-Italic-v01.ttf","53dedd689147bd6955b6564dc09f702a"],["/type/GEInspiraSans-Italic-v01.woff","01ef5dd0da7dc3099fa6b60d58e62440"],["/type/GEInspiraSans-Regular-v01.eot","42c8c897bf8e5b36b9db64a4181cb89f"],["/type/GEInspiraSans-Regular-v01.svg","0566139467c522ce01dc0c5d173dd796"],["/type/GEInspiraSans-Regular-v01.ttf","cce824ce45e317da6a8b5a62cb76d568"],["/type/GEInspiraSans-Regular-v01.woff","7816ae6e96636080e37dd2a47c3ba81a"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
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
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
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

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);

    const resourcesToRemap = [
      'polymer.html',
      'polymer-mini.html',
      'polymer-micro.html',
      'webcomponents-lite.js',
      'webcomponents-lite.min.js',
      'hydrolysis.js',
      'polymer-font-awesome.html',
      'px-polymer-font-awesome.html',
      'fontawesome-webfont.woff',
      'px-demo-header.html',
      'px-demo-api-viewer.html',
      'px-demo-footer.html',
      'px-demo-configs.html',
      'px-demo-props.html',
      'px-demo-interactive.html',
      'px-demo-component-snippet.html',
      'px-demo-styles.html',
      'px-demo-behaviors.html'
    ];
    if (url.includes('GEInspiraSans')) {
      url = 'https://www.predix-ui.com/type/' + url.substr(url.lastIndexOf('/')+1);
    }
    else {
      for (var resource of resourcesToRemap) {
        if (url.includes(resource) && !url.includes('bower_components')){
          const lhsIndex = url.indexOf('px-');
          if (lhsIndex > 0){
            const rhsIndex = url.indexOf('/', lhsIndex);
            url = url.replace(url.substr(lhsIndex, rhsIndex - lhsIndex), 'bower_components')
          }
        }
      }
    }

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
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
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







