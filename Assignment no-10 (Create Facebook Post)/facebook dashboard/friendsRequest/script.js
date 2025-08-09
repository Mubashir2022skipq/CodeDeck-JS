
let friendsContainer = document.getElementById("friend_container")


// BACK TO HOME PAGE

let goToHomeButton = document.getElementById("go_home");
let backToPreviousPage = document.getElementById("back_prevoius_page");


function handleButtonClick(e){
      
    if(e.target.id === "go_home" ){
        
        window.location.href = '../index.html';
    }
    else if (e.target.id === "back_previous_page" ) {
        window.history.back();

    }
}

goToHomeButton.addEventListener('click',handleButtonClick);
backToPreviousPage.addEventListener('click',handleButtonClick);








function friendRequest() {
    let loginUser = JSON.parse(localStorage.getItem("loginUser"));

    let registerUser = JSON.parse(localStorage.getItem("registerUsers"));

    friendsContainer.innerHTML = ' ';

    let now = new Date();

    registerUser.forEach(ruser => {

        let matched = loginUser.some(log => log.id === ruser.id)


        if (!matched) {
            friendsContainer.innerHTML += `
              
              <div class="friend-request">
            <img class="friend-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Friend">
            <div class="friend-info">
                <div class="friend-name">${ruser.name} ${ruser.lastName}</div>
                <div class="mutual-friends">12 mutual friends</div>
                <div class="request-time">${now.toLocaleTimeString()}</div>
            </div>
            <div class="action-buttons">
                <button class="confirm-btn" data-id="${ruser.id}" >Confirm</button>
                <button class="delete-btn" data-id="${ruser.id}">Delete</button>
            </div>
        </div>`;



        }

    });



}


// ADD EVENT FOR FREIENDS CONTAINER (DIV)

friendsContainer.addEventListener('click', (e) => {

    if (e.target && e.target.classList.contains("confirm-btn")) {

        let userId = e.target.getAttribute("data-id");
        handleConfirm(userId, e.target);

    }
    if (e.target && e.target.classList.contains("delete-btn")) {
        let userId = e.target.getAttribute("data-id");
        handleDelete(userId, e.target);

    }

})


// CONFIRM FRIENDS

function handleConfirm(userId, buttonElement) {

    let registerUser = JSON.parse(localStorage.getItem('registerUsers'));
    let user = registerUser.find((u) => { return u.id === userId });



    if (user) {

        buttonElement.textContent = "Add Firend";
        buttonElement.style.backgroundColor = '#4CAF50';



        let loginUser = JSON.parse(localStorage.getItem("loginUser"));
        if (!loginUser[0].friends) {
            loginUser[0].friends = [];
        }




        loginUser[0].friends.push(user);
        console.log("Updated loginUser (before saving):", loginUser);

        localStorage.setItem("loginUser", JSON.stringify(loginUser));

    }
}

function handleDelete(userId, buttonElement) {

    let friendRequestElement = buttonElement.closest(".friend-request");
    friendRequestElement.remove();


    let registerUser = JSON.parse(localStorage.getItem("registerUsers"));
    let updateRegisterUser = registerUser.filter((u) => {
        return u.id !== userId;
    })


}



friendRequest();





