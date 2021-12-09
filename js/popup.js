// popup.js
import {apiGetUserData} from '../modules/api_calls.js';
import {apiGetAsJSON} from '../modules/api_calls.js';


async function main() {
    // Get form api url from config file
    const configUrl = chrome.runtime.getURL('./config.json');
    let apiUserLoginUrl = await apiGetAsJSON(configUrl);
    apiUserLoginUrl = apiUserLoginUrl['url_api_user_login'];
    document.getElementById('login-form').action = apiUserLoginUrl;
}

main();


let userEmail;

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

function toggleLogin()
{
    if (userEmail != null) {
        hidePageElement("login");
        showPageElement("menu");
        document.getElementById("loggedInUser").textContent = userEmail;
    }
    else {
        hidePageElement("menu");
        showPageElement("login");
    }
}

function checkLogin()
{
    chrome.storage.sync.get("userEmail", (data) => {
        if (data.userEmail != null){
            userEmail = data.userEmail;
        } else {
            userEmail = null;
        }

        toggleLogin();
    });
}

// Safety check login
checkLogin();


// Event listener for "Report bug" button
document.getElementById("reportBugBtn").addEventListener("click", ()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.storage.local.set({ "bug_url": tabs[0].url })
    });
    chrome.tabs.captureVisibleTab((data) => {
        chrome.storage.local.set({ "report_img": data })
    })
    chrome.windows.create({'url': '../views/reportbug.html', 'type': 'popup'
    , "height": 720, "width": 600}, function(window) {})
});

// Event listener for "Register" button
document.getElementById("registerBtn").addEventListener("click", ()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.storage.local.set({ "bug_url2": tabs[0].url })
      });
    chrome.windows.create({'url': '../views/register.html', 'type': 'popup'
    , "height": 620, "width": 400}, function(window) {})
});


// Event listener for "Ticket overview" button
document.getElementById("overviewBtn").addEventListener("click", ()=>{
    // Insert code to open new tab with ticket overview dashboard
});

// Event listener for "Log out" button
document.getElementById("logOutBtn").addEventListener("click", ()=>{
    chrome.storage.sync.remove("userEmail");
    chrome.storage.sync.remove("userId");
    chrome.storage.sync.remove("apiToken");
    checkLogin();
});

function isDomainValid() {
    userEmail = document.getElementById("email").value;
    let uEmail = userEmail.split('@').slice(1);
    let allowedDomains = [ 'basworld.com', 'bastrucks.com'];
    allowedDomains.forEach(function(item)
    {
        if(uEmail == item){
            return true;
        }
    });
    return false;
}

document.forms['login-form'].addEventListener('submit', (event) => {
    event.preventDefault();
    // TODO do something here to show user that form is being submitted
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
        if (body["token"]) {
            let token = body["token"];
            let userId = body["id"];
            chrome.storage.sync.set({ "userEmail": document.getElementById("email").value });
            chrome.storage.sync.set({ "userId": userId });
            chrome.storage.sync.set({ "apiToken": token });
            checkLogin();
        }
        else if (body["message"]) {
            alert(body["message"]);
        }
        else {
            alert("API response was not valid. Try again.");
        }
    }).catch((error) => {
        alert("API response was not valid. Try again.");
        // TODO handle error
    });
});

// Set form action destination URL
function setUrl() {
    if (xhr.readyState === 4) {
        document.getElementById('login-form').action = 
            JSON.parse(xhr.response)['url_api_user'];
    }
}

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = setUrl;
xhr.open("GET", chrome.runtime.getURL('../config.json'), true);
xhr.send();