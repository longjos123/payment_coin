import { useState } from 'react'
import Card from '@material-tailwind/react/Card'
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter'
import { Link } from 'react-router-dom'
import { Image, Button } from '@material-tailwind/react'
import { setGlobalState, useGlobalState } from '../store'

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty)
  const [cart] = useGlobalState('cart')

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  const increaseQty = () => {
    let cartItems = [...cart]
    const newItem = { ...item, qty: (item.qty += 1), stock: (item.stock -= 1) }
    cartItems[item] = newItem
    setGlobalState('cart', cartItems)
    setQty(newItem.qty)
  }

  const decreaseQty = () => {
    let cartItems = [...cart]
    if (qty == 1) {
      const index = cartItems.indexOf(item)
      cartItems.splice(index, 1)
    } else {
      const newItem = {
        ...item,
        qty: (item.qty -= 1),
        stock: (item.stock += 1),
      }
      cartItems[item] = newItem
      setQty(newItem.qty)
    }
    setGlobalState('cart', cartItems)
  }

  return (
      <tr>
      <td>
        <img src={item.imgURL} alt="Product 1" className='w-48' />
      </td>
      <td>{item.name}</td>
      <td>
      <div className="flex flex-row items-center mx-4">
          <Button
            color="green"
            buttonType="filled"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={decreaseQty}
          >
            -
          </Button>
          <span className="mx-4">{qty}</span>
          <Button
            color="green"
            buttonType="filled"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={increaseQty}
            disabled={item.stock == 0}
          >
            +
          </Button>
        </div>
      </td>
      <td>{toCurrency(item.price)}</td>
      <td>{toCurrency(item.price * qty)}</td>
    </tr>
  )
}

export default CartItem
