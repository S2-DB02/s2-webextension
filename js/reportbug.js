// reportbug.js
import {apiGetAsJSON} from "../modules/api_calls.js";

async function main() {

  // Get form api url from config file
  const configUrl = chrome.runtime.getURL('./config.json');
  let apiTicketUrl = await apiGetAsJSON(configUrl);
  apiTicketUrl = apiTicketUrl['url_api_ticket'];
  document.getElementById('report-form').action = apiTicketUrl;

  chrome.storage.local.get("report_img", (data) => {
    document.getElementsByClassName("screenshot")[0].src = data.report_img;
  });

  // Get URL of the current active user window/tab
  chrome.storage.local.get("bug_url", (data) => {
    let bug_url = data.bug_url;
    // URL is encoded twice
    bug_url = encodeURIComponent(bug_url);
    bug_url = encodeURIComponent(bug_url);
    document.getElementById("url-input").value = bug_url;
  });
}

main();