import React, {useState} from 'react'
import firebase, { usersCollection } from '../../firebaseutils/firebase'
require('firebase/auth')

export default function FormLogin() {

  
  const initInputs={
    registered:false, 
    user:{
      email:'',
      password:''
    }
  }
  const [registerUser, setRegisterUser]=useState(initInputs)

  
  function handleSubmit(e){
    e.preventDefault()
    const email = registerUser.user.email
    const password = registerUser.user.password
    
    if (registerUser.registered){
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resUser =>{
        handleStoreRegisterUser(resUser)
        resUser.user.sendEmailVerification().then(()=>{
          console.log('email sent')
        })
      })
      .catch(err => console.log(err))
    }else{
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res =>{
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  }

  function handleStoreRegisterUser(data){
    usersCollection.doc(data.user.uid).set({
      email:data.user.email,
    }).then(data =>{
      console.log(data)
    }).catch(err => console.log(err))
  }

  function handleChange(e){
    const {name, value} = e.target
    console.log(name,value,'name,value')
    setRegisterUser(prevInputs => {
      if (name === 'email' || name === 'password')
          return { 
              ...prevInputs, 
              user: { 
                ...prevInputs.user,
                  [name]: value
              }
          }
      else 
          return {
          ...prevInputs,
          [name]: value
      }
    })
  }
  
  function handleLogout(){
    firebase.auth().signOut().then(()=>{
      console.log('user logged out')
    })
  }
  function handleUserInfo(){
    let getUser=firebase.auth().currentUser;
    if(getUser){
      getUser.getIdTokenResult().then(res =>{
        console.log(res)
      })
    }else{
      console.log('NO USER')
    }
  }

  function handleUpdateEmail(){
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential('steve@gmail.com','979235')
    if(getUser){
      getUser.reauthenticateWithCredential(credential).then(res =>{
        getUser.updateEmail('crees979@gmail.com')
      })
    }
  }

  function handleUpdateProfile(){
    let getUser = firebase.auth().currentUser;
    getUser.updateProfile({
      displayName:"steve",
      photoURL:"https//photo.jpeg"
    }).then(()=>{
      console.log(getUser)
    })
  }

  function handleGoogleSignIn(){
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((res)=>{
      //store on firestore
      handleStoreRegisterUser(res)
      console.log(res)
    }).catch(err => console.log(err))
  }

  // const {email, password}=registerUser.user
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
          <input
          type='email'
          value={registerUser.user.email}
          name='email'
          onChange={handleChange}
          />
           <label>Password</label>
          <input
          type='text'
          value={registerUser.user.password}
          name='password'
          onChange={handleChange}
          />
      <button type='submit'> 
        {registerUser.registered===true ? "register" : 'signin'}
      </button>
      </form>
      <button onClick={()=>handleLogout()}>logout</button>
      <button onClick={()=>handleUserInfo()}>get user info</button>
      <button onClick={()=>handleUpdateEmail()}>update email</button>
      <button onClick={()=>handleUpdateProfile()}>update profile</button>
      <button onClick={()=>handleGoogleSignIn()}>google sign in</button>
    </div>
  )
}
