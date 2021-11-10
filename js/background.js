import {getCurrentTabUrl} from '../modules/tabs.js';
import {apiGetPageTickets} from '../modules/api_calls.js';

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getAmountTicketsOnPage() {
  let queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, function(tabs){

  });




async function main(){
  let contextMenuItem = {
    "id": "reportBugItem",
    "title": "Report bug",
    "contexts": ["page", "selection"]
  };

  chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
  });
  
  chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "reportBugItem"){
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.storage.local.set({ "bug_url": tabs[0].url })
      });
      chrome.windows.create({'url': '../views/reportbug.html', 'type': 'popup'
      , "height": 720, "width": 600}, function(window) {})
    }
  });
}

main();

// This section creates the badge (number of bugs on page)
function getBadgeStatus() {
  const status = chrome.storage.sync.get("badgeEnabled", (data) => {
    return data.badgeEnabled
  });
  if (status == true) {
    console.log(status);
    return true;
  } else {
    return false;
  }
}

async function getJSON(url) {
  try {
      const response = await fetch(url, {method: 'GET'});

      return response.json();
  } catch (error) {
      console.error(error);
  }
}

async function setBadge() {
  let tickets = await getJSON("http://127.0.0.1:8000/api/ticket/");
  tickets = tickets['data'];
  let badgeAmount = tickets.length;
  badgeAmount = badgeAmount.toString();
  chrome.action.setBadgeBackgroundColor({color: 'red'});

  if (getBadgeStatus()){
    chrome.action.setBadgeText({text: badgeAmount});
  } else {
    chrome.action.setBadgeText({text: ""});
  }
}

setBadge();

chrome.storage.onChanged.addListener(function(){
  setBadge();
});

chrome.tabs.onActivated.addListener(function(){
  setBadge();
});
}