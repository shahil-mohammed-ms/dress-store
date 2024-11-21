import React from 'react'
import ProfileComponent from '@/components/profileComponent/ProfileComponent'
import Header from '@/components/layouts/header/header'
import Footer from '@/components/layouts/footer/Footer'


function Profile() {
  return (
    <div>
      <Header/>
      <ProfileComponent/>
      <Footer/>
    </div>
  )
}

export default Profile