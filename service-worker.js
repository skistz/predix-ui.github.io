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

var precacheConfig = [["/css/predix-ui-styles.html","be3d8baac37308e24f0a06ea1027c40e"],["/css/px-sb-list-styles.html","20a7aeb6cbac60bdfe127c0c574856d0"],["/css/px-sb-styles.html","7c4da7d4c66a81184a1454fc33c21cff"],["/img/Github-seed-shot.png","7725f7d09e7a6c84ac27a431d9a68806"],["/img/Predix_UI-Logo.png","f58d896ad355f7e4b580725d2c4a96db"],["/img/Predix_small.png","1cbf8a0269d09c560b05789009cd5eeb"],["/img/component_peel.jpg","377f6d7e2eada426194ed2b795fc33ef"],["/img/favicon.ico","601d347c6f5101ad51e6a69d5684dcab"],["/img/github_icon.png","8ea6d92c9b5a546370d8dbafc75c37cf"],["/img/icon_blocks.png","f7386a8ff161d58ee8a70aecf5224687"],["/img/icon_comp.png","486f4a4699af94f68461708324a72453"],["/img/icon_wrench.png","2190c3409461aa5c0a186ecefaa8a97f"],["/img/inuit.png","4b856e8f978c63b614bf820e28429139"],["/img/monogram-wdmk.png","2f6824f06c05628be996ebb4383e4863"],["/img/pattern_hero.jpg","307f9ea47ac7093bcfdd337c6a0a6e2b"],["/img/polymer_logo.jpg","c380b256bfa5afd306f16a31b482af93"],["/img/predix_tiles_ipad.png","fca8eaad6683a19bf7eeb645e592c403"],["/img/predix_ui_screen.png","79e7c37ec6b7af6a8e970f78ba9ca7a4"],["/img/seed_beautyshot.png","f1a24c2cdc1b0063f1c1facadc87530e"],["/img/time_series_3d.png","b1991c60adc90882865c81a254c111bb"],["/img/twitter_icon.png","b62eb90cf9628d7e22c7a161daa4a59d"],["/img/webSocket.png","e0a375f55fb86283b872082b5d26ff0d"],["/index.html","61f4c83226370dd46ceebbd4e30de678"],["/landing_page.html","ad4250d6ec66a5def55c7fb1fe9bf3e6"],["/px-catalog-state.html","e5b2036434a296f5c213eeb84da350b3"],["/px-sb-list.html","2e851bb55603d81618990a15573c7ec9"],["/px-sb.html","995cd050231d8503ae281730a091d5db"],["/type/GEInspiraSans-Bold-v01.eot","3ece5fb565c778d8927acc4b2b809636"],["/type/GEInspiraSans-Bold-v01.svg","80d3b6332937eec46d8b6ae1f5367e76"],["/type/GEInspiraSans-Bold-v01.ttf","bf1a0a684b461d7671a97848549726c1"],["/type/GEInspiraSans-Bold-v01.woff","eb2c300821907d598c460841ae0feb86"],["/type/GEInspiraSans-BoldItalic-v01.eot","4ec4a09887d570e6651752a34cdb53e9"],["/type/GEInspiraSans-BoldItalic-v01.svg","e5ef88c3ff15b4b48624a4112659cf28"],["/type/GEInspiraSans-BoldItalic-v01.ttf","20fb887c83f524c0ffe6449ff504b8df"],["/type/GEInspiraSans-BoldItalic-v01.woff","09b3024dedc6c4323e72913cc9fe3011"],["/type/GEInspiraSans-Italic-v01.eot","59c2dde875a905d2029ed8fd95bbb510"],["/type/GEInspiraSans-Italic-v01.svg","9a47087d06f400f59a7a7c19faeb98ab"],["/type/GEInspiraSans-Italic-v01.ttf","53dedd689147bd6955b6564dc09f702a"],["/type/GEInspiraSans-Italic-v01.woff","01ef5dd0da7dc3099fa6b60d58e62440"],["/type/GEInspiraSans-Regular-v01.eot","42c8c897bf8e5b36b9db64a4181cb89f"],["/type/GEInspiraSans-Regular-v01.svg","0566139467c522ce01dc0c5d173dd796"],["/type/GEInspiraSans-Regular-v01.ttf","cce824ce45e317da6a8b5a62cb76d568"],["/type/GEInspiraSans-Regular-v01.woff","7816ae6e96636080e37dd2a47c3ba81a"],["/use_component_generator.html","d007ba26ba63666daad2ab88b4a06ca2"],["/use_css.html","b0775c31c26cc3c0cc9b81196b9a0148"],["/use_seed.html","70f7901710c45e9bffbdafbc95418255"],["/what_is_predix_ui.html","c80d8c119f896162842db5ce4347f6cd"]];
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







