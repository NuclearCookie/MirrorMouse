var host_port, client_port;
function backgroundSetHost(tab) {
    chrome.tabs.executeScript(tab.id, {file:"host_script.js"}, function(result) {
        host_port = chrome.tabs.connect(tab.id, {name: "receiveInput"});
        host_port.onMessage.addListener(function(msg) {
            if( client_port ) client_port.postMessage(msg);
        });
    });

}

function backgroundSetClient(tab) {
    chrome.tabs.executeScript(tab.id, {file:"client_script.js"}, function(result) {
        client_port = chrome.tabs.connect(tab.id, {name: "sendInput"});
    });
}
