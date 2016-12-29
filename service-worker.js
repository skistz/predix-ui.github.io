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

var precacheConfig = [["/bower_components/hydrolysis/hydrolysis.html","72f4ead6b9e0ab0c57605e0574f29c99"],["/bower_components/hydrolysis/hydrolysis.js","82148eeaaf0519efbc445de7ada47dbc"],["/bower_components/polymer/polymer-micro.html","363623d9ab9ade5eb67cc264b5e2ee8c"],["/bower_components/polymer/polymer-mini.html","85fb24027a48ee5f998a4d27eb50e15b"],["/bower_components/polymer/polymer.html","d2c5ff282c9ba6b41188064390fb6868"],["/bower_components/px-polymer-font-awesome/polymer-font-awesome.html","e6d9b26dd818e21bf95c1e7ab81024d3"],["/bower_components/px-polymer-font-awesome/px-polymer-font-awesome.html","90f006398ddba448ce4f235766142f70"],["/bower_components/px-spinner/index.html","fadbeeaad844844308b69292d4b9d2be"],["/bower_components/px-spinner/px-spinner.html","e7e2526f6b33f9805e8d0789cb183db0"],["/bower_components/px-theme/px-theme-styles.html","9dc656a638c686341d2de48beaf86025"],["/bower_components/webcomponentsjs/webcomponents-lite.js","7da0c33a6f82869081795cf111392359"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","89313f9f2126ddea722150f8154aca03"],["/css/predix-ui-styles.html","a94c9dcf91402e2a8ce2b479aed568b5"],["/css/px-sb-list-styles.html","805c2874c163049e1c0b1a7636f8610c"],["/css/px-sb-styles.html","7c4da7d4c66a81184a1454fc33c21cff"],["/img/Github-seed-shot.png","7725f7d09e7a6c84ac27a431d9a68806"],["/img/Predix-UI-Favicon_128x128.png","044e7aba2485ada48a73a50d6a6ae89e"],["/img/Predix-UI-Favicon_16x16.png","e10d5e4935fb558ed29ebecb5fd8b178"],["/img/Predix-UI-Favicon_192x192.png","9390949b5754eaed25c82da98185a3ce"],["/img/Predix-UI-Favicon_24x24.png","f64011abbeb33fef3d364e0e54a50af4"],["/img/Predix-UI-Favicon_32x32.png","99312d1ebd526ea1ee6ae4d32728d002"],["/img/Predix-UI-Favicon_64x64.png","b7fef22317822dae53f4b85cc17bffc0"],["/img/Predix_UI-Logo.png","f58d896ad355f7e4b580725d2c4a96db"],["/img/Predix_small.png","1cbf8a0269d09c560b05789009cd5eeb"],["/img/component_peel.jpg","377f6d7e2eada426194ed2b795fc33ef"],["/img/favicon.ico","601d347c6f5101ad51e6a69d5684dcab"],["/img/github_icon.png","8ea6d92c9b5a546370d8dbafc75c37cf"],["/img/icon_blocks.png","f7386a8ff161d58ee8a70aecf5224687"],["/img/icon_comp.png","486f4a4699af94f68461708324a72453"],["/img/icon_wrench.png","2190c3409461aa5c0a186ecefaa8a97f"],["/img/inuit.png","4b856e8f978c63b614bf820e28429139"],["/img/monogram-wdmk.png","2f6824f06c05628be996ebb4383e4863"],["/img/pattern_hero.jpg","307f9ea47ac7093bcfdd337c6a0a6e2b"],["/img/polymer_logo.jpg","c380b256bfa5afd306f16a31b482af93"],["/img/predix_tiles_ipad.png","fca8eaad6683a19bf7eeb645e592c403"],["/img/predix_ui_screen.png","79e7c37ec6b7af6a8e970f78ba9ca7a4"],["/img/seed_beautyshot.png","f1a24c2cdc1b0063f1c1facadc87530e"],["/img/time_series_3d.png","b1991c60adc90882865c81a254c111bb"],["/img/twitter_icon.png","b62eb90cf9628d7e22c7a161daa4a59d"],["/img/webSocket.png","e0a375f55fb86283b872082b5d26ff0d"],["/index.html","e2581974592e811348f5170aefc5690f"],["/landing_page.html","47367ac9a9ba15e66b76b164a904b7a5"],["/px-catalog-state.html","e1dca9a1c6ba34cdc2d94aedfe7d2221"],["/px-sb-list.html","ae71195af2f15ed8adc9ee5831e05730"],["/px-sb.html","995cd050231d8503ae281730a091d5db"],["/type/GEInspiraSans-Bold-v01.eot","3ece5fb565c778d8927acc4b2b809636"],["/type/GEInspiraSans-Bold-v01.svg","80d3b6332937eec46d8b6ae1f5367e76"],["/type/GEInspiraSans-Bold-v01.ttf","bf1a0a684b461d7671a97848549726c1"],["/type/GEInspiraSans-Bold-v01.woff","eb2c300821907d598c460841ae0feb86"],["/type/GEInspiraSans-BoldItalic-v01.eot","4ec4a09887d570e6651752a34cdb53e9"],["/type/GEInspiraSans-BoldItalic-v01.svg","e5ef88c3ff15b4b48624a4112659cf28"],["/type/GEInspiraSans-BoldItalic-v01.ttf","20fb887c83f524c0ffe6449ff504b8df"],["/type/GEInspiraSans-BoldItalic-v01.woff","09b3024dedc6c4323e72913cc9fe3011"],["/type/GEInspiraSans-Italic-v01.eot","59c2dde875a905d2029ed8fd95bbb510"],["/type/GEInspiraSans-Italic-v01.svg","9a47087d06f400f59a7a7c19faeb98ab"],["/type/GEInspiraSans-Italic-v01.ttf","53dedd689147bd6955b6564dc09f702a"],["/type/GEInspiraSans-Italic-v01.woff","01ef5dd0da7dc3099fa6b60d58e62440"],["/type/GEInspiraSans-Regular-v01.eot","42c8c897bf8e5b36b9db64a4181cb89f"],["/type/GEInspiraSans-Regular-v01.svg","0566139467c522ce01dc0c5d173dd796"],["/type/GEInspiraSans-Regular-v01.ttf","cce824ce45e317da6a8b5a62cb76d568"],["/type/GEInspiraSans-Regular-v01.woff","7816ae6e96636080e37dd2a47c3ba81a"],["/use_component_generator.html","2a47afac9327f763fb0c6bf0ea437c47"],["/use_css.html","51bb84443f2e0c77f666f0603b9e80f3"],["/use_seed.html","da2db90ebc780d4ae15a8a8f13eec68d"],["/what_is_predix_ui.html","a8b96baca8f3cac4074e0286c1397b79"]];
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
      'px-polymer-font-awesome.html'
    ];

    for (var resource of resourcesToRemap) {
      if (url.includes(resource) && !url.includes('bower_components')){
        const lhsIndex = url.indexOf('px-');
        if (lhsIndex > 0){
          const rhsIndex = url.indexOf('/', lhsIndex);
          url = url.replace(url.substr(lhsIndex, rhsIndex - lhsIndex), 'bower_components')
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







