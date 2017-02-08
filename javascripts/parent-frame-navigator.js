(function(window, document) {
  'use strict';

  // Listen for events from child iFrames and handle them. Used to handle
  // navigation on the same domain.
  window.addEventListener('message', handleMessage, false);

  /**
   * Handles messages passed from child iFrames and dispatches them to a specific
   * event handler. Checks the correct origin to determine if the message
   * can be securely parsed.
   * @param {Event} evt
   */
  function handleMessage(evt) {
    // Only accept messages from this domain, for security reasons
    // var MESSAGE_SOURCE = 'https://www.predix-ui.com';
    var MESSAGE_SOURCE = 'http://localhost:8080';

    if (evt.origin !== MESSAGE_SOURCE) return;

    // Parse message and pass to handler
    if (evt.data.type === 'LOCAL_NAVIGATION') return handleNavigation(evt.data.newPath);
  }

  function handleNavigation(hostname) {
    debugger;
  }
})(window, document);
