import React from 'react'
import Header from '@/components/layouts/header/header'
import ProductsParentLayout from '@/components/ProductsParentLayout/ProductsParentLayout'
import Footer from '@/components/layouts/footer/Footer'

function Products() {
  return (
    <div>
      <Header/>
      <ProductsParentLayout/>
      <Footer/>
    </div>
  )
}

export default Products