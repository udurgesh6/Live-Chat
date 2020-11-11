// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";


const fireebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDhq7UyhRSrSfaNQA3kvmtZKGzSWv12VK4",
    authDomain: "messenger-clone-4d11f.firebaseapp.com",
    databaseURL: "https://messenger-clone-4d11f.firebaseio.com",
    projectId: "messenger-clone-4d11f",
    storageBucket: "messenger-clone-4d11f.appspot.com",
    messagingSenderId: "973954082708",
    appId: "1:973954082708:web:baf67eb7bb30161ff25181",
    measurementId: "G-CEWMX5BRQX"
});

const db = fireebaseApp.firestore();

export default db;
