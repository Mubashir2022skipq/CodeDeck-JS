import { loginUser } from "../../firebase/auth.js";

import { validateForm } from "./formValidation.js";

document.getElementById("redirect_SignupPage").addEventListener('click',()=>{
    window.location.href ='../Signup/signup.html';
})


document.getElementById("loginForm").addEventListener("submit",async(e)=>{
      e.preventDefault();

      let {isValid,email,password} = validateForm("login");
      if(!isValid) return;

      const result = await loginUser(email.value,password.value );

      if(result.success){

        alert("Login sucessfully");
        e.target.reset();


       
        window.location.href = '../index.html';
        


      }
      else{
        alert("Error: " + result.error );
      }


})