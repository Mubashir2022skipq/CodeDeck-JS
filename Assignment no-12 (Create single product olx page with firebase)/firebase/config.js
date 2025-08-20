
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmWKB3uRNKPMj4swuulyuwvWo59FtuI58",
  authDomain: "olxclone-97513.firebaseapp.com",
  projectId: "olxclone-97513",
  storageBucket: "olxclone-97513.firebasestorage.app",
  messagingSenderId: "534909006060",
  appId: "1:534909006060:web:a01ad57364a660f384f5c9",
  measurementId: "G-5Z0XNWBQ9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export{
  auth,
  db,
  

}
