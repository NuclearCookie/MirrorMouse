console.log("CLIENT SCRIPT INJECTED");
var client_offset_x = -10;
var client_offset_y = -30;

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "sendInput");
  port.onMessage.addListener(function(msg) {
    console.log("Receiving mouse events!");
    msg.event.clientX += client_offset_x;
    msg.event.clientY += client_offset_y;
    processEvent(msg.event);
    // coming from flash, click events are not caught.
    if ( msg.event.type == "mousedown" ) {
        msg.event.type = "click";
        processEvent(msg.event);
    }
  });
});

function processEvent(e) {
    e.view = window;
    e.relatedTarget = undefined;
    var event;
    if (typeof( document.createEvent ) == "function") {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent(e.type,
        e.bubbles, e.cancelable, e.view, e.detail,
        e.screenX, e.screenY, e.clientX, e.clientY,
        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
        e.button, document.body.parentNode);
    } else if (document.createEventObject) {
      event = document.createEventObject();
      for (var prop in e) {
        event[prop] = e[prop];
      }
      event.button = { 0:1, 1:4, 2:2 }[event.button] || event.button;

    }
    dispatchEvent(document.getElementsByTagName("canvas")[0], event);
}

function dispatchEvent (el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent('on' + type, evt);
  }
  return evt;
}
