import React from 'react'
import CartPage from '@/components/cart/CartPage'
import Header from '@/components/layouts/header/header'
import Footer from '@/components/layouts/footer/Footer'

function Cart() {
  return (
    <div>
      <Header/>
      <CartPage/>
      <Footer/>
    </div>
  )
}

export default Cart