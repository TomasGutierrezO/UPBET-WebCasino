// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD573iGcewZ7xyoxRdODWc5ClGjXKk_qWY",
    authDomain: "upbetdb-b973e.firebaseapp.com",
    projectId: "upbetdb-b973e",
    storageBucket: "upbetdb-b973e.appspot.com",
    messagingSenderId: "461317233738",
    appId: "1:461317233738:web:148ba7748faa2b897b5ab3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();