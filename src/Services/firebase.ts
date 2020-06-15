import firebase from "firebase";
import "firebase/auth";

import { IFirebase } from "../common/";

const firebaseConfig: IFirebase = {
  apiKey: "AIzaSyBKgfwJzrLfKw5pwwoETuC8kjEvQxQYMaE",
  authDomain: "enye-challenge-cohort4.firebaseapp.com",
  databaseURL: "https://enye-challenge-cohort4.firebaseio.com",
  projectId: "enye-challenge-cohort4",
  storageBucket: "enye-challenge-cohort4.appspot.com",
  messagingSenderId: "593014726896",
  appId: "1:593014726896:web:929afb5c37510f948ae235",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
