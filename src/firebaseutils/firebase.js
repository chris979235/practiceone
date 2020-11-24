import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDmMuu41ojH9-5ZwKAHLNbbaXP8XXyKTDQ",
  authDomain: "practiceonehelloworld.firebaseapp.com",
  databaseURL: "https://practiceonehelloworld.firebaseio.com",
  projectId: "practiceonehelloworld",
  storageBucket: "practiceonehelloworld.appspot.com",
  messagingSenderId: "384613172147",
  appId: "1:384613172147:web:0a3f1a3cae5541c86141c6",
  measurementId: "G-V2PDGN8RZP"
};


firebase.initializeApp(firebaseConfig)
firebase.auth()
//storage
export const storage = firebase.storage()
export const storageRef = storage.ref()
export const usersRef = storageRef.child('images/users')

const database = firebase.firestore()
export const carsCollection = database.collection('cars')
export const usersCollection = database.collection('users')
// export const siteRef= database.doc('site/Business')
export const employeeRef = database.collection('site').doc('employees').collection('admins')
export const firebaseTimeStamp = firebase.firestore.FieldValue.serverTimestamp;


export default firebase