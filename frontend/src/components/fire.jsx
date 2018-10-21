import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyARKd0eR-siisTTSnJkNe5il7ig-kkPP6s",
  authDomain: "pukaar-9478a.firebaseapp.com",
  databaseURL: "https://pukaar-9478a.firebaseio.com",
  projectId: "pukaar-9478a",
  storageBucket: "pukaar-9478a.appspot.com",
  messagingSenderId: "720745713861"
};

export default firebase.initializeApp(config);
