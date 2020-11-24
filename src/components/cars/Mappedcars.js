import React from 'react'

export default function Mappedcars(props) {
  console.log(props,8888)
  return (
    <div>
      <ul>
        <li>ID: {props.id}</li>
        <li>Brand: {props.brand}</li>
        <li>Color: {props.color}</li>
        <li>Price: {props.price}</li>
      </ul>
    </div>
  )
}
