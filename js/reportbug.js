// reportbug.js
import {apiGetAsJSON} from "../modules/api_calls.js";

function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

async function main() {

  // Get form api url from config file
  const configUrl = chrome.runtime.getURL('./config.json');
  let apiTicketUrl = await apiGetAsJSON(configUrl);
  apiTicketUrl = apiTicketUrl['url_api_ticket'];
  document.getElementById('report-form').action = apiTicketUrl;


  chrome.storage.local.get("report_img", (imgdata) => {
    document.getElementsByClassName("screenshot")[0].src = imgdata.report_img;
    // document.getElementsByName("photo")[0].value = imgdata.report_img;
    var meh = imgdata.report_img;
    console.log("meh");

    var file =  dataURLtoFile(meh, "test.png");
    console.log(meh);
    document.getElementsByName("photo")[0].FileList = file;
    // var image = new Image();
    // image.src = imgdata.report_img;
    // document.getElementsByName("photo")[0].filename = image;
    // document.body.appendChild(image);

    // var imageData = canvas.toDataURL('image/png');
    // document.getElementsByName('photo')[0].setAttribute("value", imgdata.report_img)

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