import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import ListingCards from '../../Components/ListingCards'
import Navbar from '../../Components/Navbar'
import stays from "../../dummy/stays.json"
import SearchFilter from '../../Components/SearchFilter'
import Modal from '../../Components/Modal'
import Input from '../../Components/Input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  minprice: string;
  maxprice: string;
  daterange: Date[] | null[];
  minrating: string;
}

const initialFormValues: FormValues = {
  minprice: "",
  maxprice: "",
  daterange: [null, null],
  minrating: ""
};


const Home = () => {
  // Form
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValues(initialFormValues);
  };

  // Date Picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <Layout>
      <Modal
        isOpen={showModal}
        isClose={() => setShowModal(false)}
        title="Filters"
        size='flex flex-col w-10/12 h-10/12'
      >
        <form onSubmit={handleSubmit} className='flex flex-col font-light'>
          <Input
            label='Minimum Price'
            name='minprice'
            type='Number'
            placeholder=''
            value={formValues.minprice}
            onChange={handleInputChange}
          />
          <Input
            label='Maximum Price'
            name='minprice'
            type='Number'
            placeholder=''
            value={formValues.minprice}
            onChange={handleInputChange}
          />
        </form>
      </Modal>

      <Navbar>
        <SearchFilter
          handleClick={handleClick}
        />
      </Navbar>

      <div className='flex flex-col my-4 gap-4 w-full items-center sm:mt-10 sm:grid sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 xl:grid-cols-4'>
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