import {apiGetAsJSON} from '../modules/api_calls.js';

async function main() {
    // Get form api url from config file
    const configUrl = chrome.runtime.getURL('./config.json');
    let apiUserUrl = await apiGetAsJSON(configUrl);
    console.log(apiUserUrl['url_api_user_login']);
    apiUserUrl = apiUserUrl['url_api_user_login'];
    // document.getElementById('register-form').action = apiUserUrl;
  }
  main();
  var password = document.getElementById("password");
  var email = document.getElementById("email").value;
  function validatePassword() {
    //minimum password length validation  
    if(password.value.length < 8) {  
        document.getElementById("message").innerHTML = "**Password length must be at least 8 characters";  
        return false;
    }
    else{
        document.getElementById("message").innerHTML = "";
    }
}
    function validateEmail() {
        let domain = email.split('@').slice(1);
        let allowedDomains = [ 'basworld.com', 'bastrucks.com'];
        allowedDomains.forEach(function(item)
                {
                  if(domain == item){
                    chrome.storage.sync.set({ "userEmail": email });
                    document.getElementById("login-form").submit();
                    console.log("data");
                  }
                }
        );
    }
  document.getElementById("loginSubmitBtn").addEventListener("click", ()=>{
    console.log("test")
    validateEmail();
  });
  password.onchange = validatePassword;