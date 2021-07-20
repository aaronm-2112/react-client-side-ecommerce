import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAPurqbdFlpp2mtr8cKQX7ZAAfoy9HV7Yw",
  authDomain: "ecommerce-crwn-33e21.firebaseapp.com",
  projectId: "ecommerce-crwn-33e21",
  storageBucket: "ecommerce-crwn-33e21.appspot.com",
  messagingSenderId: "1078485096954",
  appId: "1:1078485096954:web:b9bf49c04eae40b5e5ac43",
  measurementId: "G-EML7624QZF",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
