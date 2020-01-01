import React from 'react'
import { ICar } from './demo'

interface IProps{
    car:ICar
}

const CartItem: React.FC<IProps> = ({car}) => {
  return (
    <div>
      <h1>{car.model} </h1>
    </div>
  )
}

export default CartItem
