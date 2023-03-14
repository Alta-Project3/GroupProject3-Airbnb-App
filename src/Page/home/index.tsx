import React from 'react'
import Layout from '../../Components/Layout'
import ListingCards from '../../Components/ListingCards'
import Navbar from '../../Components/Navbar'
import stays from "../../dummy/stays.json"

const Home = () => {
  return (
    <Layout>
      <Navbar>

      </Navbar>

      <div className='flex flex-col my-4 gap-4 w-full items-center sm:mt-10 sm:grid sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {stays.map((stay: any) => {
          return (
            <ListingCards
              key={stay.id}
              id={stay.id}
              location={stay.location}
              rating={stay.rating}
              available={stay.available}
              price={stay.price}
              image={stay.image}
            />
          )
        })}
      </div>

    </Layout>
  )
}

export default Home