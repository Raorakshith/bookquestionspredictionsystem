import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBh646gq2zhLF7w8pzVA5JX6UZReslX__8",
    authDomain: "calloc-landing-website.firebaseapp.com",
    databaseURL: "https://calloc-landing-website-default-rtdb.firebaseio.com",
    projectId: "calloc-landing-website",
    storageBucket: "calloc-landing-website.appspot.com",
    messagingSenderId: "985509226560",
    appId: "1:985509226560:web:4cdcd573a8a8c1d32f17a5",
    measurementId: "G-9FKNBPMKR5"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
var storage = firebase.storage();
const db = firebase.firestore();


export {auth , firebase, provider, storage, db};