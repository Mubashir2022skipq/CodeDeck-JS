// Jab page completely load ho jaye
// window.addEventListener("load", function () {
//   const loader = document.getElementById("loader");
//   const content = document.getElementById("content");

// Loader ko hide karo
//   loader.style.display = "none";

// Actual content show karo
//   content.style.display = "block";
// });

// ACCESS THE BOOtSTRAP MODEL (USING API FUNCTION).





// LOADING ANIMATION.

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loading_container").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 1000); // 3 second delay
});


// FOR TOSTER FOR SUCCESSFULLY.
function displaySuccessToaster(msg) {
  toastr.options.timeOut = 1500; // 1.5s 
  toastr.success(` ${msg} `);
}

// FOR TOSTER FOR ERROR.
function displayErrorToaster(msg) {
  toastr.options.timeOut = 1500; // 1.5s 
  toastr.error(` ${msg} `);
}



// FORM VALIDATION.




function validateForm(formType) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const nameRegex = /^[A-Z][a-zA-Z]{2,30}$/;

  let isValid = true;

  // Select input fields and error elements dynamically based on formType
  const email = document.querySelector(`#${formType}Email`);
  const password = document.querySelector(`#${formType}Password`);
  const firstName = document.querySelector(`#${formType}FirstName`);
  const lastName = document.querySelector(`#${formType}LastName`);
  const confirmPassword = document.querySelector(`#${formType}ConfirmPassword`);



  const emailError = document.querySelector(`#${formType}EmailError`);
  const passwordError = document.querySelector(`#${formType}PasswordError`);
  const firstNameError = document.querySelector(`#${formType}FirstNameError`);
  const lastNameError = document.querySelector(`#${formType}LastNameError`);
  const confirmPasswordError = document.querySelector(`#${formType}ConfirmPasswordError`);

  // Hide previous error messages
  if (emailError) emailError.style.display = "none";
  if (passwordError) passwordError.style.display = "none";
  if (firstNameError) firstNameError.style.display = "none";
  if (lastNameError) lastNameError.style.display = "none";
  if (confirmPasswordError) confirmPasswordError.style.display = "none";


  //VALIDATE EMAIL.
  if (!emailRegex.test(email.value)) {
    if (emailError) {
      emailError.textContent = "Invalid email";
      emailError.style.display = "initial";
      emailError.style.color = "red";

    }
    isValid = false;

  }

  // PASSWORD VALIDATION.
  if (!passwordRegex.test(password.value)) {
    if (passwordError) {
      passwordError.textContent = "Password must be at least 8 characters with uppercase, number, special char.";
      passwordError.style.display = "initial";
      passwordError.style.color = "red";
    }

    isValid = false;

  }

  if (formType === "register") {
    if (!nameRegex.test(firstName.value)) {

      if (firstNameError) {
        firstNameError.textContent = "First name must start with capital and be 3+ letters.";
        firstNameError.style.display = "initial";
        firstNameError.style.color = "red";
      }
      isValid = false;
    }

    if (!nameRegex.test(lastName.value)) {

      if (lastNameError) {
        lastNameError.textContent = "Last name must start with capital and be 3+ letters.";
        lastNameError.style.display = "initial";
        lastNameError.style.color = "red";
      }
      isValid = true;

    }
    if (password.value !== confirmPassword.value) {
      if (confirmPasswordError) {
        confirmPasswordError.textContent = "Password do not match";
        confirmPasswordError.style.display = "initial";
        confirmPasswordError.style.color = "red";
      }
      isValid = false;
    }
    if (isValid) {
      const user = new User(firstName.value, lastName.value, email.value, password.value);
      user.saveToLocalStorage();
    }




  }

  if (formType === "login" && isValid) {
    const success = User.checkLogin(email.value, password.value);
    if (!success) {
      isValid = false;
      displayErrorToaster("Invalid email or password");
    }
  }




  return isValid;  // Return validation status
}



document.getElementById("registerform").addEventListener("submit", function (dets) {
  dets.preventDefault();




  const isValid = validateForm("register");



  if (isValid) {
    displaySuccessToaster("Registeration Successful");
    const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
    if (modal) modal.hide();

    dets.target.reset();

  }




});



document.getElementById("loginform").addEventListener("submit", function (dets) {
  dets.preventDefault();
  const isValid = validateForm("login");

  if (isValid) {
    displaySuccessToaster("Login Successful");

    let navLink = document.querySelector("#nav-name");

    const user = JSON.parse(localStorage.getItem("user"));

    for (u of user) {
      navLink.textContent = u.firstName
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    if (modal) modal.hide();

    dets.target.reset();
  }
});



class User {

  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;

  }

  saveToLocalStorage() {

    let user = JSON.parse(localStorage.getItem("user")) || [];
    user.push(this);
    localStorage.setItem("user", JSON.stringify(user));


  }

  static checkLogin(email, password) {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return false;

    return user.some(users => users.email === email && users.password === password);

  }

}



// API DATA FETCH.

(async function () {

  try {

    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    renderCards(data.products);




  }
  catch (error) {
    console.log(" Error fetching data  : ", error);
  }

})();




function renderCards(products) {

  products.map((products) => {

    let cardRow = document.getElementById("card_row");

    let { title, description, category, price, images } = products;
    cardRow.innerHTML += ` <div class="col-md-3 mb-4">
                    <div class="card h-100">
                        <img src="${images}" class="card-img-top"
                            alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text text-success">RS ${price}</p>
                            <p class="card-text"><small class="text-muted">${description.slice(0, 50)}...</small></p>
                        </div>
                    </div>
                </div>
`
  })

}


