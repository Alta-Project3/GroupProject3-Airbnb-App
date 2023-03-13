import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Navbar';
import stays from "../../dummy/stays.json"
import Modal from '../../Components/Modal';
import Button from '../../Components/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DetailStay = () => {
  const { stayId } = useParams()
  const stay = stays.find(({ id }) => id === parseInt(stayId || ""))

  const [showModal, setShowModal] = useState(false);

  // Date Picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <Layout>

      <Modal
        isOpen={showModal}
        isClose={() => setShowModal(false)}
        title="Room Description"
        size='flex flex-col w-10/12 h-10/12'
      >
        <p className='font-light'>
          {stay?.description}
        </p>
      </Modal>

      <img className='w-screen' src={stay?.image} alt="image" />

      <div className='flex flex-col w-10/12 gap-2 my-2'>
        <h1 className='text-2xl font-semibold'>{stay?.name}</h1>
        <h2 className="flex justify-begin gap-2 items-center">
          <div className="badge badge-accent"><AiFillStar />{stay?.rating}</div>
          {stay?.location}
        </h2>
        <p className='font-light line-clamp-5'>
          {stay?.description}
        </p>
        <button
          className='self-start font-semibold underline hover:text-accent'
          onClick={() => setShowModal(true)}
        >
          Show More
        </button>
        <DatePicker
          className="input input-primary bg-primary w-full"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update);
          }}
          isClearable={true}
        />
        <p>{JSON.stringify(dateRange)}</p>

      </div>




    </Layout>
  )
}

export default DetailStay