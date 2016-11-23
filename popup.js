document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('host_selection_button').addEventListener("click",hostClicked,false);
    document.getElementById('client_selection_button').addEventListener("click",clientClicked,false);
}, false);
function hostClicked(e){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.runtime.getBackgroundPage(function(bgpage){
            bgpage.backgroundSetHost(tabs[0]);
        });
    });
}
function clientClicked(e){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.runtime.getBackgroundPage(function(bgpage){
            bgpage.backgroundSetClient(tabs[0]);
        });
    });
}
