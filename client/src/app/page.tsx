'use client'
import Header from '@/components/layouts/header/header';
import Banner1 from '@/components/banner1/Banner1';
import Banner2 from '@/components/banner2/Banner2';
import HomeProductList from '@/components/homeProductList/HomeProductList';
import HomeCategories from '@/components/homeCategories/HomeCategories';
import Promo from '@/components/promo/Promo';
import NewsLetter from '@/components/newsLetter/NewsLetter';
import Footer from '@/components/layouts/footer/Footer';
import Testimonials from '@/components/Testimonials/Testimonials';

export default function Home() {
  return (
   <div>
  <Header/>
  <Banner1/>
  <Banner2/>
  <HomeProductList/>
  <HomeCategories/>
  <Promo/>
  <HomeProductList/>
  <Testimonials/>
  <NewsLetter/>
  <Footer/>
  

   </div>
  );
}
