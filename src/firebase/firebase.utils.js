import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAfB6BV584B4YauVZl23j77kh6_ziq8YgU",
    authDomain: "crown-db-7b556.firebaseapp.com",
    projectId: "crown-db-7b556",
    storageBucket: "crown-db-7b556.appspot.com",
    messagingSenderId: "253995163326",
    appId: "1:253995163326:web:7e97e8904938d3825808ef",
    measurementId: "G-1NTSM3VHHW"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;