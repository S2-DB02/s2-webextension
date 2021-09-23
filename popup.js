// popup.js

let userLoggedIn = true;

function showPageElement(what)
{
    var obj = typeof what == 'object'
        ? what : document.getElementById(what);

    obj.style.display = 'block';
}  
  
function hidePageElement(what)
{
    var obj = typeof what == 'object'
        ? what : document.getElementById(what);

    obj.style.display = 'none';
}

function popupWindow(url) {
    chrome.windows.create({'url': url, 'type': 'popup'
    , "height": 600, "width": 600}, function(window) {})
}

//document.getElementById("reportBugBtn")
//    .addEventListener("click", popupWindow("reportbug.html"));

if (userLoggedIn) {
    hidePageElement('login');
    showPageElement('menu');
}
else {
    hidePageElement('menu');
    showPageElement('login');
}