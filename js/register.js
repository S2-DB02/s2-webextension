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

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
      //Passwords match
    confirm_password.setCustomValidity('');
    //minimum password length validation
    if(password.value.length < 8) {
        document.getElementById("message").innerHTML = "**password length must be at least 8 characters";
        document.getElementById("registerSubmitBtn").disabled = true;
    }else{
        document.getElementById("message").innerHTML = "";
        document.getElementById("registerSubmitBtn").disabled = false;
    }
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


