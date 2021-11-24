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

// function validatePassword(){
//   if(password.value != confirm_password.value) {
//     confirm_password.setCustomValidity("Passwords Don't Match");
//   } else {
//       //Passwords match
//     confirm_password.setCustomValidity('');
//     //minimum password length validation
//     if(password.value.length < 8) {
//         document.getElementById("message").innerHTML = "**Pas4et5ryt6u6trytutysword length must be at least 8 characters";
//         return false;
//     }
//     else {
//         document.getElementById("message").innerHTML = "test";
//         // Event listener for "register" button
//         document.getElementById("registerSubmitBtn").addEventListener("click", ()=>{
//             let userEmail = document.getElementById("email").value;
//
//             let uEmail = userEmail.split('@').slice(1);
//             let allowedDomainone = "basworld.com";
//             let allowedDomaintwo = "bastrucks.com";
//                   if(uEmail == allowedDomainone || uEmail == allowedDomaintwo){
//                       chrome.storage.sync.set({ "userEmail": userEmail });
//                       alert(userEmail + "yeyeyeyey");
//                       main();
//
//                       //Register user
//                     //  document.getElementById("register-form").submit();
//                       //alert("Succesfully registered!");
//                   }else{
//                     alert("AHHHHHHHHHHHHHHHHHHHHHHHHHHH");
//
//                   }
//
//         });
//     }
//
//   }
// }

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


