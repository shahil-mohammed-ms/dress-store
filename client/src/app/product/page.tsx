import React from 'react'
import Header from '@/components/layouts/header/header'
import ProductOverView from '@/components/productOverview/ProductOverView'
import HomeProductList from '@/components/homeProductList/HomeProductList'
import Footer from '@/components/layouts/footer/Footer'
import ProductFeatures from '@/components/productFeatures/ProductFeatures'

function Product() {
  return (
    <div>
      <Header/>
      <ProductOverView/>
      {/* <ProductFeatures/> */}
      <HomeProductList/>
      <Footer/>
    </div>
  )
}

export default Product