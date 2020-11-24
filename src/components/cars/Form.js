import React, {useState, useEffect} from 'react'
import firebase, { carsCollection, firebaseTimeStamp } from '../../firebaseutils/firebase'

export default function Form() {
  const inintInputs={brand:'',color:'',price:'',available:''}
const [carFormInputs, setCarForm]=useState(inintInputs)



//add - add to the db
//set - lets you create you own id- carsCollection.doc(what you put in here will be your new id).set()
//set also return undefined, if you dont add a name in the doc it will auto generate an id
  function handleSubmitForm(e){
    e.preventDefault()
    console.log(carFormInputs,'carform')
    carsCollection.add({
      ...carFormInputs,
      available: carFormInputs.available === "true" ? true : false,
      price:parseInt(carFormInputs.price),
      createdAt: firebaseTimeStamp(),
      dealers: {
        virginia:true,
        washington:false,
        utah:true
      },
      tags:['Good', 'Comfortable', 'Expensive']
    }).then( data => {
      console.log(data)
    }).catch(err => console.log(err))
    
    setCarForm(inintInputs)
  }

 

//updating
// carsCollection.doc('j9rMUjYfk10v0cbWQNxu').update({
//   ...carFormInputs,
//   available: carFormInputs.available === "true" ? true : false,
//   price:parseInt(carFormInputs.price),
//   createdAt: firebaseTimeStamp(),
// })
//}

//how to change an object
// useEffect(()=>{
//   carsCollection.doc('mJ452GtRzjePqsGVircO').update({
//     'dealers.utah':false
//   })
// },[])

// how to change and add to array
// useEffect(()=>{
//     carsCollection.doc('mJ452GtRzjePqsGVircO').update({
//       'tags':firebase.firestore.FieldValue.arrayUnion("Awsome")
//     })
//   },[])

  //how to change and remove from an array
  // useEffect(()=>{
  //   carsCollection.doc('mJ452GtRzjePqsGVircO').update({
  //     'tags':firebase.firestore.FieldValue.arrayRemove("Awsome")
  //   })
  // },[])

function handleChange(e){
  const {name, value} = e.target
  setCarForm(prevInputs => ({
    ...prevInputs,
    [name]: value
  }))
}



const { brand, color, price, available } = carFormInputs
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
          <label>Brand</label>
          <input
          type='text'
          value={brand}
          name='brand'
          onChange={handleChange}
          />
           <label>Color</label>
          <input
          type='text'
          value={color}
          name='color'
          onChange={handleChange}
          />
           <label>Price</label>
          <input
          type='text'
          value={price}
          name='price'
          onChange={handleChange}
          />
           <label>Available</label>
          <select
          name='available'
          value={available}
          onChange={handleChange}
          >
          <option value='undecided'>unknown</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
          </select>
          <button type='submit'>submit</button>
      </form>
    </div>
  )
}
