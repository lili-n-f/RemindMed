import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAreJKr3j90FE7CH2Z96El1DHNGQf2YSJU",
  authDomain: "remindmed-c6f9b.firebaseapp.com",
  projectId: "remindmed-c6f9b",
  storageBucket: "remindmed-c6f9b.appspot.com",
  messagingSenderId: "184289951030",
  appId: "1:184289951030:web:9e91dae52be92c3db9c797",
  measurementId: "G-WVYL08XNDV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Entrar con correo
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};
//Aquí definimos como se va a crear el user
const register = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};
//signout normal
const logout = () => {
  signOut(auth);
};
export { login, register, sendPasswordReset, logout };
