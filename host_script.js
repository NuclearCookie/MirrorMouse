/* get body,
register all mouse event handlers
sen events to bg page, which should send the emulated events to client_script.js
*/
console.log("HOST SCRIPT INJECTED");
var host_port;
chrome.runtime.onConnect.addListener(function(port) {
  host_port = port;
  console.assert(port.name == "receiveInput");
  var body = document.body;
  var param = document.createElement("param");
  param.name = "wmode";
  param.value = "transparent";
  var embed = document.getElementsByTagName("embed")[0];
  embed.parentNode.insertBefore(param, embed);
  body.addEventListener('dragstart', handler);
  body.addEventListener('dragend', handler);
  body.addEventListener('drag', handler);
  body.addEventListener('click', handler);
  body.addEventListener('dblclick', handler);
  body.addEventListener('mousedown', handler);
  body.addEventListener('mouseup', handler);
  body.addEventListener('mouseover', handler);
  body.addEventListener('mouseout', handler);
  body.addEventListener('mousemove', handler);
});

handler = function(e) {
    var json_friendly = jsonFriendlyMouseEvent(e);
    host_port.postMessage({"event" :json_friendly });
};

jsonFriendlyMouseEvent = function(e) {
    return {
        type: e.type,
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        detail: e.detail,
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        button: e.button
    };
};
