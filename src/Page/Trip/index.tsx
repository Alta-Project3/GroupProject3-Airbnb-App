import React,{useState} from 'react'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import FeedBackCard from '../../Components/FeedBackCard'
import stays from "../../dummy/stays.json"
import Modal from '../../Components/Modal'


import { FaRegStar } from 'react-icons/fa'
import { Rating } from '@smastrom/react-rating'
import { FaStar } from 'react-icons/fa'

const Trip = () => {

    const [showFeedback, setShowFeedback] = useState(false)
    const [showEditFeedback, setShowEditFeedback] = useState(false)


  return (
    <Layout>
    <Navbar>

    </Navbar>

    <div className='flex flex-col my-4 gap-4 w-full items-center sm:mt-10 sm:grid sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {stays.map((stay: any) => {
        return (
          <FeedBackCard
            key={stay.id}
            id={stay.id}
            location={stay.name}
            available={stay.available}
            price={stay.price}
            image={stay.image}
            value={stay.rating}
            handleFeedback={()=> setShowFeedback(true)}
            handleEdit={()=> setShowEditFeedback(true)}
          />
        )
      })}
    </div>
    <Modal
    title='Give Review'
    isOpen={showFeedback}
    isClose={()=>setShowFeedback(false)}
    >

    </Modal>
    <Modal
    title='Edit Review'
    isOpen={showEditFeedback}
    isClose={()=>setShowEditFeedback(false)}
    >

    </Modal>
  </Layout>
  )
}

export default Trip