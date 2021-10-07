// reportbug.js

// Get URL of the current active user window/tab
chrome.storage.local.get("bug_url", (data) => {
document.getElementById("url-input").value = data.bug_url;
});

// Set form action destination URL
function setUrl() {
    if (xhr.readyState === 4) {
        document.getElementById('report-form').action = 
            JSON.parse(xhr.response)['url_api_ticket'];
    }
}

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = setUrl;
xhr.open("GET", chrome.runtime.getURL('/config.json'), true);
xhr.send();