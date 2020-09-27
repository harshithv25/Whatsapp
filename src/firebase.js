import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCE1ZTHjUdYxnkODXiIqqtycp8GLu_SusI",
    authDomain: "chatter-55.firebaseapp.com",
    databaseURL: "https://chatter-55.firebaseio.com",
    projectId: "chatter-55",
    storageBucket: "chatter-55.appspot.com",
    messagingSenderId: "143804400489",
    appId: "1:143804400489:web:e49d9dff69566db3ac33f8",
    measurementId: "G-D5231L3C2F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;