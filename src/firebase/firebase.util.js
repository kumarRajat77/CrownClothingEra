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

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`); //use this to set Data
    const snapshot = await userRef.get();// this is to get the data

    if(!snapshot.exists){
      const {displayName,email,photoURL} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          photoURL,
          ...additionalData,
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;
