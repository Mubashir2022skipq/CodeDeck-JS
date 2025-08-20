import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { db } from '../../firebase/config.js';
// Change main image when thumbnail is clicked
function changeMainImage(element) {
    const mainImage = document.querySelector('.main-image');
    mainImage.src = element.src;

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// Show phone number
let adData = null;
document.getElementById("show_number").addEventListener("click", showPhoneNumber)
// function showPhoneNumber() {
//     alert("Seller's phone number: +91 98765 43210");
// }
function showPhoneNumber() {
    alert("Seller's phone number:"+adData);
}



// Zoom image functionality
function zoomImage(element) {
    document.getElementById('zoomedImage').src = element.src;
}

// Initialize Bootstrap tooltips
document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});



const params = new URLSearchParams(window.location.search);
console.log(params);
const adId = params.get("id");



async function loadAdDetail() {

    if (!adId) return alert("No Ad Found!");

    const docRef = doc(db, "ads", adId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap)

    if (docSnap.exists()) {
        const ad = docSnap.data();
        document.querySelector("h1").textContent = ad.title;
        document.querySelector(".price-tag").textContent = `Rs ${ad.price}`;
        document.querySelector(".main-image").src = ad.images[0] || "";
        document.querySelector("#datetime").textContent = ad.createdAt;
        document.querySelector("#province").textContent = ad.provinces;
        document.querySelector("#seller-name").textContent = ad.name;
        document.querySelector("#brand").textContent = ad.brand;
        document.querySelector("#category").textContent = ad.category;
        document.querySelector("#condition").textContent = ad.condition;
        document.querySelector("#product_description").textContent = ad.description;    
        adData= ad.phone;
        



        document.querySelector("product_description").textContent = ad.description;
    }
    else {
        alert("Ad not found!");
    }
   
}

loadAdDetail();
