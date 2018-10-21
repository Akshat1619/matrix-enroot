import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDXCjFkph5CQmORDQ2Lg9URNFSk2G7KiP0",
  authDomain: "emailapp-11f88.firebaseapp.com",
  databaseURL: "https://emailapp-11f88.firebaseio.com",
  projectId: "emailapp-11f88",
  storageBucket: "emailapp-11f88.appspot.com",
  messagingSenderId: "1031635846190"
};

var otherApp = firebase.initializeApp(config, "other");

export default otherApp;
