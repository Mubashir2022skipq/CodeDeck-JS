
// LOGIN PROCESS

document.getElementById("create_account").addEventListener("click", function () {
    window.location.href = '../index.html'
})


function loginPage() {

    let registerData = JSON.parse(localStorage.getItem("registerUsers"));
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let matchedUser = registerData.find(users => users.email === loginEmail && users.password === loginPassword);

    if (matchedUser) {
        let loginUser = JSON.parse(localStorage.getItem("loginUser")) ?? [];


        let isAlreadyLoggedIn = loginUser.some(users => users.id === matchedUser.id);

        if (!isAlreadyLoggedIn) {
            loginUser.push(matchedUser);
            localStorage.setItem("loginUser", JSON.stringify(loginUser));


        }

        window.location.href = '../facebook dashboard/index.html'

    }
    else {
        alert("Invalid email or Password");
    }



}




document.getElementById("loginbtn").addEventListener('click', function () {

    loginPage();

})
