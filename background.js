// background.js

var contextMenuitem = {
  "id": "reportBug",
  "title": "Report bug",
  "contexts": ["page", "selection"]
};

chrome.contextMenus.create(contextMenuitem);

if (clickData.menuItemId == "reportBug"){
  window.open("https://www.w3schools.com"); 
}