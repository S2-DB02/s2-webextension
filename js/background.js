import {getCurrentTabUrl} from '../modules/tabs.js';
import {apiGetPageTickets} from '../modules/api_calls.js';

async function getCurrentTab() {
  let queryOptions = {
    active: true,
    currentWindow: true
  };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getAmountTicketsOnPage() {
  let queryOptions = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryOptions, function(tabs) {

  });
}

async function main() {

  ReportBugInContextMenu();
  setBadgeIfEnabled();

  chrome.contextMenus.onClicked.addListener(function(clickData, tab) {
    if (clickData.menuItemId == "reportBugItem") {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabs) {
        chrome.storage.local.set({
          "bug_url": tabs[0].url
        })
      });

      chrome.tabs.captureVisibleTab(null, null, (dataUrl) => {
        chrome.windows.create({
          'url': '../views/reportbug.html',
          'type': 'popup',
          "height": 720,
          "width": 600
        }, function(window) {
          console.log(dataUrl);
          chrome.storage.local.set({
            "report_img": dataUrl
          })
        });
      });
    }
  });
}

// This section creates the badge (number of bugs on page)
function clearBadge() {
  chrome.action.setBadgeText({
    text: ''
  });
}

function setBadgeIfEnabled() {
  chrome.storage.sync.get("badgeEnabled", (data) => {
    if (data.badgeEnabled == true) {
      setBadge()
    }
    else {
      clearBadge();
    }
  });
}

async function setBadge() {
    const currentUrl = await getCurrentTabUrl();
    if (currentUrl.includes('basworld.com')) {
      const tickets = await apiGetPageTickets(currentUrl);
      let badgeAmount = tickets.length;
      badgeAmount = badgeAmount.toString();
      chrome.action.setBadgeBackgroundColor({
        color: 'red'
      });
      if (badgeAmount > 0) {
        chrome.action.setBadgeText({
          text: badgeAmount
        });
      }
      else {
        clearBadge();
      }
    }
    else {
      clearBadge();
    }
}

chrome.storage.onChanged.addListener(function() {
  setBadgeIfEnabled();
  ReportBugInContextMenu();
});

chrome.tabs.onActivated.addListener(function() {
  setBadgeIfEnabled();
});

chrome.tabs.onUpdated.addListener(function() {
  setBadgeIfEnabled();
});

chrome.runtime.onInstalled.addListener(function(details) {
    if ((details.reason === 'install') || (details.reason === 'update'))
    {
      //chrome.tabs.create("www.google.com")
        refreshBrowser('register', true);
    }
});

function ReportBugInContextMenu() {
  let contextMenuItem = {
    "id": "reportBugItem",
    "title": "Report bug",
    "contexts": ["page", "selection"]
  };

  chrome.contextMenus.removeAll(function() {
    // See if user is logged in
    chrome.storage.sync.get("userEmail", (data) => {
      if (data.userEmail != null){
        chrome.contextMenus.create(contextMenuItem);
      }
    });
  });
}

function refreshBrowser(target, bringToForeground) {
    if (target !== 'register') return;
    chrome.windows.getAll({ populate: true }, function(windows)
    {
        var foundExisting = false;
        windows.forEach(function(win)
        {
            win.tabs.forEach(function(tab)
            {
                // Ignore tabs not matching the target.
                if (target === 'register') {
                    if (!/https:\/\/(mail|inbox)\.google\.com/.test(tab.url)) return;
                }
                else
                {
                    return; // Unknown target.
                }
                // Reload the matching tab.
                chrome.tabs.reload(tab.id); // If this is the first one found, activate it.
                if (bringToForeground && !foundExisting)
                {
                    chrome.tabs.update(tab.id, { active: true }); }
                foundExisting = true;
            });
        });
        // If no gmail tab found, just open a new one.
        if (bringToForeground && !foundExisting)
        {
            //chrome.tabs.create( views('../views/register'));
             chrome.tabs.create({
                url: '/views/register.html'
             });
        }
    });
}

main();
