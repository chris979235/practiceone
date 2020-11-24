import React, {useEffect, useState} from 'react'
import {carsCollection} from '../../firebaseutils/firebase'
import {firebaselooper} from '../../firebaseutils/tools'
import Mappedcars from './Mappedcars'
import Form from './Form'

export default function Cars(){
const [allcars, setCars]=useState([])

function getAllCars(){
  carsCollection
  //where -find by specified info
  // .where('price','>=',400)
  //orderby -order by specific criteria
  //limit(2) will return 2 items
  //limitToLast() will return the last
  //createdAt() - gives time stamp
  //startAt() give critera to start at
  //endAt() end at specific critera
  // .limitToLast(2)
  .orderBy('price', 'desc')
  .get()
  .then( snapshot =>{
    const cars = firebaselooper(snapshot)
    console.log(cars)
    setCars(cars)
  })
  .catch(err => console.log(err))
}

  useEffect(()=>{
    getAllCars()
  },[])
    //getbyid
    // carsCollection.doc(
    //   'KhCD6GYzXtFfRvNUQvH1'
    //   ).get().then( snapshot =>{
    //     console.log(snapshot.data(),34)
    //   })


    // employeeRef.get().then( snapShot => { 
    //   const employees = firebaselooper(snapShot)
    //   console.log(employees,5555)
    // })


  // onsnapshot gives realtime info on item being updated
      
   

      return (
        <div>
          <Form/>
          <ul>
            <li>ID</li>
            <li>Brand</li>
            <li>Color</li>
            <li>Price</li>
          </ul>
          {allcars.map( (data,i) => (
            <Mappedcars  key={i} id={data.id} brand={data.brand} color={data.color} price={data.price} available={data.available} />
          ))}
        </div>
     
  )
}


