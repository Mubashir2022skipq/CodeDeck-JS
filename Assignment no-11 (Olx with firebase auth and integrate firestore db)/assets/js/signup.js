import { signupUser } from "../../firebase/auth.js";
import {validateForm} from './formValidation.js'





// FOR SIGNUP 

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const { isValid, firstName, lastName, email, phone, password } = validateForm("register");

  if (!isValid) return;

  const result = await signupUser(firstName.value, lastName.value, email.value, phone.value, password.value);
  // const result = await signupUser(firstName, lastName, email, phone, password);
  console.log(result);
  if (result.success) {
    alert("Registration Successful");

    window.location.href = "../index.html";
    e.target.reset();
  } else {
    alert("Error: " + result.error);
  }
});



// REDIRECT TO LOGIN PAGE FROM SIGNUP PAGE



document.getElementById("redirect_LoginPage").addEventListener("click",()=>{

  window.location.href = "../Login/login.html";

})




