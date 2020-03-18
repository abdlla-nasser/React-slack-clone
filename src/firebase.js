import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD0PROJY5nXzAJdSHrsDlqLB4XgXufCyPM",
    authDomain: "react-slack-clone-dd91e.firebaseapp.com",
    databaseURL: "https://react-slack-clone-dd91e.firebaseio.com",
    projectId: "react-slack-clone-dd91e",
    storageBucket: "react-slack-clone-dd91e.appspot.com",
    messagingSenderId: "479198260984",
    appId: "1:479198260984:web:8418b6c9273afedf57150d",
    measurementId: "G-PLL3LQPYEM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;