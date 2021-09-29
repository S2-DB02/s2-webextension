// popup.js

let userLoggedIn = true;

function showPageElement(what)
{
    var obj = typeof what == "object"
        ? what : document.getElementById(what);

    obj.style.display = "block";
}

function hidePageElement(what)
{
    var obj = typeof what == 'object'
        ? what : document.getElementById(what);

    obj.style.display = "none";
}

// Event listener for "Report bug" button
document.getElementById("reportBugBtn").addEventListener("click", ()=>{
    chrome.windows.create({"url": "reportbug.html", "type": "popup"
    , "height": 600, "width": 600}, function(window) {})
})

// Event listener for "Ticket overview" button
document.getElementById("overviewBtn").addEventListener("click", ()=>{
    // Insert code to open new tab with ticket overview dashboard
})

if (userLoggedIn) {
    hidePageElement("login");
    showPageElement("menu");
}
else {
    hidePageElement("menu");
    showPageElement("login");
}