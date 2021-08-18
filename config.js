import  firebase from "firebase";
 var firebaseConfig = {
    apiKey: "AIzaSyAVAbQr3ZV6thB0FI1T3DDOwdKs-JGikUk",
    authDomain: "student-8db66.firebaseapp.com",
    databaseURL: "https://student-8db66-default-rtdb.firebaseio.com",
    projectId: "student-8db66",
    storageBucket: "student-8db66.appspot.com",
    messagingSenderId: "978733321125",
    appId: "1:978733321125:web:170025061a2c1ba5aef64c"
  };

if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
 }         
   export default firebase.database();