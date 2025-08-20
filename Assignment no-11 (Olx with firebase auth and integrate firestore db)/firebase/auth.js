import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { auth, db } from "./config.js";

// FOR SIGNUP 

// export function signup(firstName,lastName,email,password){

//     return createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
//         const user = userCredential.user;

//         return addDoc(collection(db,'user'),{

//             firstName,
//             lastName,
//             email,
//             phone,
//             uid:user.id


//         }).then(()=>{
//             return {sucess: true,user};
//         })


//     }).catch((error)=>{
//         console.error("error during signup:",error.message);
//         return {success: false,message:error.message }
//     })

// }

// FOR LOGIN

// export function login(email,password){

//     return signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
//         return {sucess:true,user:userCredential.user}
//     }).catch((error)=>{
//           console.error("Error dusing login:",error.message);
//           return {success:false,message:error.message}
//     })

// }

// FOR SIGNUP

export async function signupUser(firstName, lastName, email, phone, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {

            firstName,
            lastName,
            email,
            phone,
            createdAt: new Date().toISOString()
           

        })
        return { success: true, uid }


    }
    catch (error) {
        return { success: false, error: error.message }
    }

}

// FOR LOGIN

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return { success: true, userData: userDoc.data() };
        }
        else {
            return { success: false, error: "User datanot found" };
        }

    }
    catch (error) {
        return { success: false, error: error.message };

    }


}

export async function logout() {
    await signOut(auth);
}



