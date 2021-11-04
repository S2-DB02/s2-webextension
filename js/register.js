import {apiGetUserDAta} from '../modules/api_calls.js';

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
        document.getElementById("message").innerHTML = "**Password length must be at least 8 characters";  
        return false;
    }
    else {
        document.getElementById("message").innerHTML = "";
        // Event listener for "register" button
        document.getElementById("registerSubmitBtn").addEventListener("click", ()=>{
            userEmail = document.getElementById("email").value;
            console.log(userEmail)
            let uEmail = userEmail.split('@').slice(1);
            let allowedDomains = [ 'basworld.com', 'bastrucks.com'];
            allowedDomains.forEach(function(item)
                {
                    if(uEmail == item){
                        chrome.storage.sync.set({ "userEmail": userEmail });
                        //Register user
                        createUser();
                        //Log in after register
                        checkLogin();
                    }
                }
            );
        });
    }  
    
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


