import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import firebase from './firebaseutils/firebase'

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged(user =>{
  if(user){
    console.log(user.email)
    console.log(user.emailVerified)
    console.log(user.uid)

  }else{
    console.log('no user')
  }
})