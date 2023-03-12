import React from 'react'
import Layout from '../../Components/Layout'
import ListingCards from '../../Components/ListingCards'
import Navbar from '../../Components/Navbar'

const Home = () => {
  return (
    <Layout>
      <Navbar />

      <div className='flex flex-col mt-4 gap-4 w-full items-center'>
        <ListingCards
          location='Bogor, Indonesia'
          rating={4.5}
          available="Apr 10 - 15"
          price={2500000}
          image="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-dskt/tix-hotel/images-web/2021/03/12/c787bd29-4af1-4a4a-971f-a0df8cadaee7-1615563884519-157817001f6a78b890369fcbb737fc07.jpg"
        />

        <ListingCards
          location='Bogor, Indonesia'
          rating={4.7}
          available="Apr 20 - 29"
          price={1700000}
          image="https://www.amesbostonhotel.com/wp-content/uploads/2021/09/Rekomendasi-Penginapan-Villa-di-Bogor.jpg"
        />

      </div>

    </Layout>
  )
}

export default Home