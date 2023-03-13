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

      <div className='flex flex-col my-4 gap-4 w-full items-center'>
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