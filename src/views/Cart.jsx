import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { addToOrders } from '../firebase'
import { setAlert, setGlobalState, useGlobalState } from '../store'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { payWithEthers } from '../shared/Freshers'

const Cart = () => {
  const [cart] = useGlobalState('cart')
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  const [total, setTotal] = useState(0)
  const [buyer] = useGlobalState('connectedAccount')
  const [ethToUsd] = useGlobalState('ethToUsd')

  const getTotal = () => {
    let total = 0
    cart.forEach((item) => (total += item.qty * item.price))
    setTotal(total)
  }

  const placeOrder = () => {
    if (!isLoggedIn) return
    const item = {
      buyer: buyer,
      price: 0,
      name: '',
      account: ''
    }
    cart.map((product) => {
      item.account = product.account;
      item.price = parseFloat(item.price) + (parseFloat(product.price) * product.qty);
      item.name = item.name + product.name
    })
    var items = cart

    const productCheckout = { ...item, price: (item.price / ethToUsd).toFixed(4) }

    payWithEthers(productCheckout).then((networkId) => {
      addToOrders(items, networkId).then((data) => {
        setGlobalState('cart', [])
        if (data) {
          setAlert(`Order Placed with Id: ${data.order}`)
        }
      })
    }) 
  }

  const clearCart = () => {
    setGlobalState('cart', [])
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  useEffect(() => getTotal(), [cart])

  return (
    <div className="addProduct">
      <Menu />
      <div className="container">
        <h2>Your Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className="cart">
          <table className="table mt-8">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace the following rows with your actual product data */}
              {cart.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <p className="total fa-2x">Total Price: {toCurrency(total)}</p>
          <button class="btn btn-warning" onClick={clearCart}><i class="fas fa-trash-alt"></i> Clear Cart</button>
          <button class="btn btn-success ml-2" onClick={placeOrder}><i class="fas fa-shopping-cart"></i> Place Order</button>
          </div>
        ) : (
          <div className="mt-10 text-center">
            <h4 className="mb-4">Cart empty, add some items to your cart</h4>
            <Link to="/" className="text-green-500">
              Choose Product
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
