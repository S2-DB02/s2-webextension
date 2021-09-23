// eventPage.js

var contextMenuitem = {
  "id": "reportBug",
  "title": "Report bug",
  "contexts": ["page", "selection"]
};

chrome.contextMenus.create(contextMenuitem);