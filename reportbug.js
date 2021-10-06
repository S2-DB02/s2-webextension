// reportbug.js

chrome.storage.local.get("url", (data) => {
document.getElementById("url-input").value = data.url;
});
