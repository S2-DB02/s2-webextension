// background.js

// This part creates the context menu item and corresponding listener
let contextMenuItem = {
  "id": "reportBugItem",
  "title": "Rapporteer bug",
  "contexts": ["page", "selection"]
};

chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "reportBugItem"){
  chrome.windows.create({'url': 'reportbug.html', 'type': 'popup'
  , "height": 600, "width": 600}, function(window) {})
  }
})

// This part creates the badge (number of bugs on page)
let badgeAmount = 1; // replaced by value from db when the time comes
let badgeAmountString = badgeAmount.toString();
chrome.action.setBadgeText({text: badgeAmountString});
chrome.action.setBadgeBackgroundColor({color: 'red'});