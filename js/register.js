import {apiGetUserData} from '../modules/api_calls.js';
import {apiGetAsJSON} from '../modules/api_calls.js';


async function main() {
  // Get form api url from config file
  const configUrl = chrome.runtime.getURL('./config.json');
  let apiUserUrl = await apiGetAsJSON(configUrl);
  apiUserUrl = apiUserUrl['url_api_user'];
  document.getElementById('register-form').action = apiUserUrl;
}
main();


var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");


password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


