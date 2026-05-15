import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OurChickens from './pages/OurChickens'
import Homeschooling from './pages/Homeschooling'
import Blog from './pages/Blog'
import Resources from './pages/Resources'
import YouTubeMedia from './pages/YouTubeMedia'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="our-chickens" element={<OurChickens />} />
            <Route path="homeschooling" element={<Homeschooling />} />
            <Route path="blog" element={<Blog />} />
            <Route path="resources" element={<Resources />} />
            <Route path="youtube-media" element={<YouTubeMedia />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
