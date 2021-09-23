// background.js

var contextMenuitem = {
  "id": "reportBug",
  "title": "Report bug",
  "contexts": ["page", "selection"]
};

chrome.contextMenus.create(contextMenuitem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "reportBug"){
  chrome.windows.create({'url': 'reportbug.html', 'type': 'popup'
  , "height": 600, "width": 600}, function(window) {})
  }
})
