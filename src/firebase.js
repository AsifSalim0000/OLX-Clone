import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut ,updateProfile} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBInXgGq1zERodQVZ0HPtdFb4zQKuNzjME",
  authDomain: "olx-clonedd.firebaseapp.com",
  projectId: "olx-clonedd",
  storageBucket: "olx-clonedd.appspot.com",
  messagingSenderId: "124085313210",
  appId: "1:124085313210:web:b99f9a179d96f72aac6c83"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const db =getFirestore(app)
const storage = getStorage(app);

const signup = async(name,email,password,phone)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user= res.user;
    await updateProfile(auth.currentUser, {
      displayName: name
    });

    await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        phone,
        authProvider: "local",
        email,
    })
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,storage,login,signup,logout}