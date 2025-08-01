

class User {

    constructor(email, password) {
        this.email = email;
        this.password = password;

    }
    saveToLocalStorage() {
        let user = JSON.parse(localStorage.getItem("user")) ?? [];
        user.push(this);
        localStorage.setItem("user", JSON.stringify(user));
    }

}

function validateForm(formType) {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const nameRegex = /^[A-Z][a-zA-Z]{2,30}$/;

    let isValid = true;


    const email = document.querySelector(`#${formType}Email`);
    const password = document.querySelector(`#${formType}Password`);

    const emailError = document.querySelector(`#${formType}EmailError`);
    const passwordError = document.querySelector(`#${formType}PasswordError`)

    if (emailError) emailError.style.display = "none";
    if (passwordError) passwordError.style.display = "none";


    if (!emailRegex.test(email.value)) {
        if (emailError) {
            emailError.textContent = "Invalid Email";
            emailError.style.display = "initial";
            emailError.style.color = "red";
        }
        isValid = false;

    }

    if (!passwordRegex.test(password.value)) {
        if (passwordError) {
            passwordError.textContent = "Invalid Passowrd";
            passwordError.style.display = "initial";
            passwordError.style.color = "red";
        }
        isValid = false

    }

    return isValid = true;


}

let loginBtn = document.getElementById('loginbtn');


loginBtn.addEventListener('click', function (dets) {

    const isValid = validateForm("login");

    if (isValid) {
        const email = document.querySelector(`#loginEmail`).value;
        const password = document.querySelector(`#loginPassword`).value;

        const user = new User(email, password);
        user.saveToLocalStorage();

        window.location.href = `./facebook dashboard/index.html`


    }

         
})