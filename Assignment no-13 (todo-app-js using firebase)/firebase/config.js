// Import the functions you need from the SDKs you need
  import { initializeApp,} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

  import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCTqa5DKhtPs3jAHQGJ8y_WAtHIFUukWSE",
    authDomain: "todo-app-6dd91.firebaseapp.com",
    projectId: "todo-app-6dd91",
    storageBucket: "todo-app-6dd91.firebasestorage.app",
    messagingSenderId: "353039403445",
    appId: "1:353039403445:web:d2160da87cf5e33e0cb1fc",
    measurementId: "G-1V47PSZTPH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  export{

    db,
   getFirestore, 
   collection, 
   addDoc, 
   getDocs, 
   deleteDoc, 
   doc, 
   updateDoc 

  }