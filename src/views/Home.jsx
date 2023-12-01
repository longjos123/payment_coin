import { useEffect, useState } from 'react'
import Foods from '../components/Foods'
import { getProducts } from '../firebase'
import Menu from '../components/Menu'
import '../assets/css/font-awesome.min.css'
import '../assets/css/linearicons.css'
import '../assets/css/animate.css'
import '../assets/css/owl.theme.default.min.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/bootsnav.css'
import '../assets/css/style.css'
import '../assets/css/responsive.css'
import Footer from '../components/Footer'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((products) => {
      products.filter((item) => {
        item.price = Number(item.price)
        item.qty = 0
      })
      setProducts(products)
    })
  }, [])

  return (
    <div className="home">
      <Menu />
      <Foods products={products} />
      <Footer />
    </div>
  )
}

export default Home
