import React from 'react'
import Menu from '../../components/common/Menu'
import Banner from '../../components/Home/Banner'
import Footer from '../../components/common/Footer'
import CartCountButton from '../../components/common/CartCountButton'
import './styles.css'


const Home = () => {
  
  return (
    
    <div>
        {/* Banner */}
        <Banner />
        {/* Menu */}
        <Menu />
        {/* Footer */}
        <Footer />
        {/* Cart count button */}
        <CartCountButton />
    </div>
  )
}

export default Home