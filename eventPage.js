// eventPage.js

var contextMenuitem = {
  "id": "spendMoney",
  "title": "Report bug",
  "contexts": ["page", "selection"]
};

chrome.contextMenus.create(contextMenuitem);