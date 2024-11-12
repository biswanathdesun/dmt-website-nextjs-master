import Footer from '@/components/common/footer/Footer'
import Navbar from '@/components/common/navbar/Navbar'
import Store from '@/components/Stores/Components/Store'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Store />
      <Footer/>
    </div>
  )
}

export default page
