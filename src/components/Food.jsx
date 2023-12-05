import React from 'react'
import CardImage from '@material-tailwind/react/CardImage'
import { setAlert, setGlobalState, useGlobalState } from '../store'
import { Link } from 'react-router-dom'

const Food = ({ item }) => {
  const [cart] = useGlobalState('cart')

  const addToCart = (item) => {
    item.added = true
    let cartItems = [...cart]
    const newItem = { ...item, qty: (item.qty += 1), stock: (item.stock -= 1) }
    if (cart.find((_item) => _item.id == item.id)) {
      cartItems[item] = newItem
      setGlobalState('cart', [...cartItems])
    } else {
      setGlobalState('cart', [...cartItems, newItem])
    }
    setAlert(`${item.name} added to cart!`)
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  return (
    <div className="col-md-3 col-sm-4">
      <div className="single-new-arrival">
        <div className="single-new-arrival-bg">
          <Link to={`/product/` + item.id}>
            <CardImage src={item.imgURL} alt={item.name} />
          </Link>
          <div className="single-new-arrival-bg-overlay" />
          <div className="sale bg-1">
            <p>sale</p>
          </div>
          <div className="new-arrival-cart">
            <p>
              <span className="lnr lnr-cart" />
              <Link to="#"
                disabled={item.stock == 0}
                onClick={() => addToCart(item)}>
                add <span>to </span> cart
              </Link>
            </p>
            <p className="arrival-review pull-right">
              <span className="lnr lnr-heart" />
              <span className="lnr lnr-frame-expand" />
            </p>
          </div>
        </div>
        <h4>
          <Link to={`/product/` + item.id}>{item.name}</Link>
        </h4>
        <span>{item.stock} in stock</span>
        <p className="arrival-product-price">{toCurrency(item.price)}</p>
      </div>
    </div>
  )
}

export default Food
