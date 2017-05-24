(function(window, document){
  // Beautify may already be loaded
  if (window.js_beautify) return;

  // Load the script
  var script = document.createElement('script');
  script.async = true;
  script.src = '../js-beautify/js/lib/beautify.js';
  script.onload = onload;
  document.head.appendChild(script);

  // Dispatch a loaded event
  function onload() {
    var evt = new CustomEvent('beautify-extension-loaded', { 'detail' : { 'type' : 'js-beautify' } });
    window.dispatchEvent(evt);
  }
})(window, document);
