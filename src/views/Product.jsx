import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, CardImage } from '@material-tailwind/react'
import { updateProduct, getProduct, deleteProduct, auth, addToOrders } from '../firebase'
import { setGlobalState, useGlobalState, setAlert } from '../store'
import { payWithEthers } from '../shared/Freshers'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [cart] = useGlobalState('cart')
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  const [buyer] = useGlobalState('connectedAccount')
  const [ethToUsd] = useGlobalState('ethToUsd')

  const addToCart = () => {
    var item = product
    item.added = true
    let cartItems = [...cart]
    const newItem = { ...item, qty: (item.qty += 1), stock: (item.stock -= 1) }
    if (cart.find((_item) => _item.id == item.id)) {
      cartItems[item] = newItem
      setGlobalState('cart', [...cartItems])
    } else {
      setGlobalState('cart', [...cartItems, newItem])
    }
    setAlert('Product added to cart')
  }

  const handlePayWithEthers = () => {
    var item = { ...product, buyer, price: (product.price / ethToUsd).toFixed(4) }
    console.log(item);
    payWithEthers(item).then((res) => {
      if (res) {
        var productAddOrder = product
        updateProduct({ ...product, stock: (item.stock -= 1) }).then(() => {
          addToOrders([productAddOrder], res).then(() => {
            setAlert('Purchase successfully')
          })
        })
      }
    })
  }

  const handleDeleteProduct = () => {
    deleteProduct(product).then(() => {
      setAlert('Product deleted!')
      navigate('/')
    })
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  useEffect(() => {
    getProduct(id).then((data) => setProduct({ ...data, qty: 1 }))
  }, [id])


  return (
    <div className="product">
      <Menu />
      <div className="container">
      {!!product ? (
          <div className="row">
            <div className="col-md-6">
              <img src={product.imgURL} alt={product.name} />
            </div>
            <div className="col-md-6">
              <h2>{product.name}</h2>
              <p>
                <strong>Price:</strong> <span className="text-green-800">{toCurrency(product.price)}</span>
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <div className="form-group">
                <label htmlFor="quantity">Quantity: </label>
                <span> {product.stock} left in stock</span>
              </div>
              <button className="btn btn-success" onClick={addToCart}>Add to cart</button>
              {isLoggedIn ? (
                <>
                {auth.currentUser.uid != product.uid &&
                  product.account != buyer ? (
                    <button className="btn btn-primary ml-2" onClick={handlePayWithEthers}>Buy with coin</button>
                  ) : null}

                  {auth.currentUser.uid == product.uid ? null : (
                    <button type="button" class="btn btn-info ml-2" onClick={() => navigate('/chat/' + product.uid)}>Chat with seller</button>
                  )}
                </>
              ) : null}

              {isLoggedIn && auth.currentUser.uid == product.uid ? (
                <>
                  <button className="btn btn-primary ml-2" onClick={() => navigate('/product/edit/' + id)}>Edit</button>
                  <button type="button" class="btn btn-danger ml-2" onClick={handleDeleteProduct}>Delete</button>
                </>
              ) : null}
            </div>
          </div>
        ) : null
      }

      <Footer />
      </div>
    </div >
  )
}

export default Product
