// popup.js
import {apiGetUserData} from '../modules/api_calls.js';
import {apiGetAsJSON} from '../modules/api_calls.js';
import {getCurrentTabUrl} from '../modules/tabs.js';
import {checkLogin} from '../js/popup.js';



// Event listener for "Report bug" button
const currentUrl = await getCurrentTabUrl();
console.log("bruh");
if (currentUrl.includes('basworld.com')) {
    document.getElementById("reportBugBtn1").addEventListener("click", () => {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            chrome.storage.local.set({ "bug_url": tabs[0].url })
        });
        chrome.tabs.captureVisibleTab((data) => {
            chrome.storage.local.set({ "report_img": data })
        });
        chrome.windows.create({'url': '../views/reportbug.html', 'type': 'popup'
        , "height": 720, "width": 600}, function(window) {});
    });
} else {
    document.getElementById("reportBugBtn1").disabled = true;
}

// Event listener for "Log out" button
document.getElementById("logOutBtn1").addEventListener("click", ()=>{
    chrome.storage.sync.remove("userEmail");
    chrome.storage.sync.remove("userId");
    chrome.storage.sync.remove("apiToken");
    checkLogin();
});