(function(window, document) {
  'use strict';

  // When a link is clicked that targets a relative path or the same hostname
  // intercept the event and attempt to pass it to my parent to control
  // navigation for me if I am in an iFrame.
  if (inFrame()) {
    document.addEventListener('click', interceptClick);
  }

  /**
   * Determine if this window context is an iFrame (not the top) or a source
   * webpage (the top).
   * @return {Boolean}
   */
  function inFrame() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
  }

  /**
   * Intercepts document click events, crawls the event's path to determine
   * if it will bubble through an anchor tag, and intercepts the click if
   * it bubbles through an anchor tag on a matching hostname.
   * Intercepted clicks will have navigation cancelled and a message will
   * be posted to the parent.
   * @param {Event} evt
   */
  function interceptClick(evt) {
    var path = evt.path;
    var i;

    for (i = 0; i < path.length; i++) {
      if (path[i].tagName === 'A' && path[i].href && hostMatchesWidnow(path[i].hostname)) {
        evt.preventDefault();
        notifyParent(path[i].href);
      }
    }
  }

  /**
   * Checks if `hostname` is the same as the window's `hostname`.
   * @param {String} hostname
   * @return {Boolean}
   */
  function hostMatchesWidnow(hostname) {
    return hostname === window.location.hostname;
  }

  /**
   * Sends a message to the parent page notifying of the attempted navigation
   * event. Will only send messages to a parent at origin MESSAGE_TARGET.
   * For local testing, set MESSAGE_TARGET to 'http://localhost:PORT'.
   * @param {String} path - The URL navigation was attempted on
   */
  function notifyParent(path) {
    // Only attempt to message this domain, for security reasons
    // var MESSAGE_TARGET = 'https://www.predix-ui.com';
    var MESSAGE_TARGET = 'http://localhost:8080';

    parent.postMessage({ type: 'LOCAL_NAVIGATION', newPath: path }, MESSAGE_TARGET);
  }
})(window, document);
