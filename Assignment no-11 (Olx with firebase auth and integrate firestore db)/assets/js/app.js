
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { db, auth } from "../../firebase/config.js";


// REDIRECT THE LOGIN PAGE.
document.getElementById("login_btn").addEventListener("click", (e) => {
    e.preventDefault();

    if (auth.currentUser) {


        console.log("Already logged in:", auth.currentUser.email);

        // DROPDOWN LOGIC LOGOUT

        

    }
    else {

        window.location.href = '../../Login/login.html';
    }


})



export function forLoginProfile() {

    const profileNameE1 = document.getElementById("profileName");

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                profileNameE1.textContent = data.firstName || "Login"
            }
            else {
                profileNameE1.textContent = "Login"
            }

        }
        else {
            profileNameE1.textContent = "Login"
        }

    })

}
forLoginProfile();


document.getElementById("add_sell_post").addEventListener("click", () => {
    window.location.href = "./Sell/sell.html";
})













// async function fetchAds(){

//     const querySnapshot = await getDocs(collection(db,"ads"));
//     const products = [];
//     querySnapshot.forEach((doc)=>{
//         products.push(doc.data());
//     })
//     renderCards(products);

// }
// fetchAds();



function renderCards(products) {
    let cardRow = document.getElementById("card_row");
    cardRow.innerHTML = ""; 

    products.map((product) => {
        let { id, title, description, price, images } = product;

        cardRow.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card h-100 card-click" data-id="${id}">
                    <img src="${images[0] || ""}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text text-success">RS ${price}</p>
                        <p class="card-text"><small class="text-muted">${description.slice(0, 50)}...</small></p>
                    </div>
                </div>
            </div>
        `;
    });

    
    // document.querySelectorAll(".card-click").forEach((card) => {
    //     card.addEventListener("click", () => {
    //         const id = card.dataset.id;
    //         window.location.href = `detail.html?id=${id}`;
    //     });
    // });
}

document.getElementById("card_row").addEventListener("click", (e)=>{
    const card = e.target.closest(".card-click");
    if(card){
        const id = card.dataset.id;
        window.location.href = `../../sell detail/detail.html?id=${id}`;
        console.log(window.location.href = `../../sell detail/detail.html?id=${id}`);
    }
});




async function fetchAds() {
    const querySnapshot = await getDocs(collection(db, "ads"));
    const products = [];
    querySnapshot.forEach((docSnap) => {
        products.push({ id: docSnap.id, ...docSnap.data() })
    })
    renderCards(products);
}

fetchAds();