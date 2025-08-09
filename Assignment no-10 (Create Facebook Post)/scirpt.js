
// REGISTERATION PROCESS

class User {

    constructor(id, name, lastName, email, password, gender) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;

    }
    saveToLocalStorage() {
        let registerUsers = JSON.parse(localStorage.getItem("registerUsers")) ?? [];
        registerUsers.push(this);
        localStorage.setItem("registerUsers", JSON.stringify(registerUsers));
    }

}

function isValidate() {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const nameRegex = /^[A-Z][a-zA-Z]{2,30}$/;

    let isValid = true;

    let email = document.getElementById("email");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let password = document.getElementById("password");

    let emailError = document.getElementById("emailError");
    let firstNameError = document.getElementById("firstnameError");
    let lastNameError = document.getElementById("lastnameError");
    let passwordError = document.getElementById("passwordError")

    if (emailError) emailError.style.display = "none";
    if (firstNameError) firstNameError.style.display = "none";
    if (lastNameError) lastNameError.style.display = "none";
    if (passwordError) passwordError.style.display = "none";

    if (!emailRegex.test(email.value)) {
        if (emailError) {
            emailError.textContent = "Invalid email";
            email.style.display = "initial";
            email.style.color = "red";
        }
        isValid = false;

    }
    if (!nameRegex.test(firstName.value)) {
        if (firstNameError) {
            firstNameError.textContent = "More than 3 characters";
            firstNameError.style.display = "initial";
            firstNameError.style.color = "red";
        }

        isValid = false;

    }
    if (!nameRegex.test(lastName.value)) {
        if (lastNameError) {
            lastNameError.textContent = "More than 3 characters";
            lastNameError.style.display = "initial";
            lastNameError.style.color = "red";
        }

        isValid = false;

    }

    if (!passwordRegex.test(password.value)) {
        if (passwordError) {
            passwordError.textContent = "Invalid Password";
            passwordError.style.display = "initial";
            passwordError.style.color = "red";
        }

        isValid = false;
    }

    return isValid = true;

}

document.getElementById("sign_up_form").addEventListener("submit", function (e) {

    e.preventDefault();

    let isValid = isValidate();
    if (isValid) {

        let id = Math.floor(Math.random() * 900) + 100;  
        let uniqueId = id + Date.now().toString().slice(-3); 


        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let day = document.getElementById("day").value;
        let month = document.getElementById("month").value;
        let year = document.getElementById("year").value;
        let gender = document.querySelector(`input[name="gender"]:checked`);

        const user =  new User(uniqueId,firstName,lastName,email,password,day,month,year,gender);
        user.saveToLocalStorage();

         e.target.reset();

        window.location.href = "./login/index.html"


       

    }
})

document.getElementById("have_account").addEventListener("click",function(){
    

    window.location.href = './login/index.html';
})