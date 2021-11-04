// options.js

// Extension badge option
let badgeSwitch = document.getElementById("badgeSwitch");

chrome.storage.sync.get("badgeEnabled", (data) => {
  if (data.badgeEnabled == true){
      badgeSwitch.checked = true;
  } else {
      badgeSwitch.checked = false;
  }
});

badgeSwitch.addEventListener("change", () => {
    if (badgeSwitch.checked){
        chrome.storage.sync.set({ "badgeEnabled": true });
    } else {
        chrome.storage.sync.set({ "badgeEnabled": false });
    }
});