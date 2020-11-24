import React, {useState, useEffect} from 'react'
import firebase, { usersRef, usersCollection } from '../../firebaseutils/firebase'

export default function Upload() {
  // const initState={
  //   image:'',
  //   url:'',
  //   progress:0
  // }
const [state, setState]=useState({
  image:'',
  url:'',
  // progress:0
})

useEffect(()=>{
  const imageRef = usersRef.child('images1.jpeg')
  imageRef.getDownloadURL()
  .then(url =>{
    console.log(url)
  })
},[])

function handleUpload(e){
  e.preventDefault()
  const {image}=state
  const uploadTask = usersRef.child(`${image.name}`).put(image)
  
  uploadTask.on('state_changed',
    (snapShot)=>{
      // const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) *100)
      // setState(progress);

        switch(snapShot.state){

        case 'canceled' : console.log('user canceled')
        break
        case 'error' : console.log('error')
        break
        case 'paused' : console.log('paused')
        break
        case 'running' : console.log('running')
        break
        case 'success' : console.log('success')
        break
        default : console.log(snapShot.state)
        }

      },
    (err)=>{
      console.log(err)
      // setState({progress:0})
    },
    ()=>{
      console.log('upload completed')
      console.log(uploadTask.snapshot.ref)
      console.log(uploadTask.snapshot.ref.bucket)
      console.log(uploadTask.snapshot.ref.fullPath)

      let getUser = firebase.auth().currentUser;
      usersCollection.doc(getUser.uid).update({
          image: uploadTask.snapshot.ref.name
      })

      uploadTask.snapshot.ref.getDownloadURL()
      .then(downloadurl =>{
        console.log('file available at', downloadurl)
      })
    }
  )
}

function handleChange(e){
  console.log(e,4444)
  if(e.target.files[0]){
    const image=e.target.files[0]
    setState({
       image:image
    })
  }
}

  return (
    <div>
      <form onSubmit={(e) => handleUpload(e)}>
        {/* <progress value={state.progress} max='100'/> */}
        <br></br>
        <label>file</label>
        <input
          type='file'
          onChange={(e) => handleChange(e)}
        />
        <button>
          upload file
        </button>
      </form>
    </div>
  )
}
