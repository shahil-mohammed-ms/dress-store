// 'use client'
// import Header from '@/components/layouts/header/header';
// import Banner1 from '@/components/banner1/Banner1';
// import Banner2 from '@/components/banner2/Banner2';
// import HomeProductList from '@/components/homeProductList/HomeProductList';
// import HomeCategories from '@/components/homeCategories/HomeCategories';
// import Promo from '@/components/promo/Promo';
// import NewsLetter from '@/components/newsLetter/NewsLetter';
// import Footer from '@/components/layouts/footer/Footer';
// import Testimonials from '@/components/Testimonials/Testimonials';
// import { useDispatch, useSelector } from 'react-redux';

// export default function Home() {
//   const userDetails = useSelector(state => state?.userDetails);


//   return (
//    <div>
//   <Header/>
//   <Banner1/>
//   <Banner2/>
//   <HomeProductList/>
//   <HomeCategories/>
//   <Promo/>
//   <HomeProductList/>
//   <Testimonials/>
//   <NewsLetter/>
//   <Footer/>
  

//    </div>
//   );
// }
'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Header from '@/components/layouts/header/header';
import Banner1 from '@/components/banner1/Banner1';
import Banner2 from '@/components/banner2/Banner2';
import HomeProductList from '@/components/homeProductList/HomeProductList';
import HomeCategories from '@/components/homeCategories/HomeCategories';
import Promo from '@/components/promo/Promo';
import NewsLetter from '@/components/newsLetter/NewsLetter';
import Footer from '@/components/layouts/footer/Footer';
import Testimonials from '@/components/Testimonials/Testimonials';

// Simplified typing for Redux state
interface RootState {
  userDetails?: any; // Replace 'any' with actual type when known
}

export default function Home() {
  // UseSelector to get userDetails; no complex typing here
  const userDetails = useSelector((state: RootState) => state.userDetails);
  console.log('ussrr',userDetails)

  return (
    <div>
      <Header />
      <Banner1 />
      <Banner2 />
      <HomeProductList />
      <HomeCategories />
      <Promo />
      <HomeProductList />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </div>
  );
}
