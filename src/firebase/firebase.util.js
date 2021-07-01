import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyB3TQPGAOOvbZYILAqjs6K0QyVxbdI6WuI",
    authDomain: "crowndb-ce3fe.firebaseapp.com",
    projectId: "crowndb-ce3fe",
    storageBucket: "crowndb-ce3fe.appspot.com",
    messagingSenderId: "344974886306",
    appId: "1:344974886306:web:4f03484a74fd29a4619efb",
    measurementId: "G-4Q2CGB3V80"
  };

  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;
