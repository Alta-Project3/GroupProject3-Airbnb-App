import React, { useEffect, useState } from 'react';
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

  // Disable Date Range
  const [startDateDisable, setStartDateDisable] = useState<string>('2023-3-17')
  const [endDateDisable, setEndDateDisable] = useState<string>('2023-3-20')
  const getDatesInRange = (startDateStr: string, endDateStr: string): Date[] => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dates = [];

    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      dates.push(new Date(currentDate));
    }

    return dates;
  };

  const disabledDates: Date[] = getDatesInRange(startDateDisable, endDateDisable)

  // Check if two arrays are unique
  const uniqueArrays = (arr1: any[], arr2: any[]): boolean =>
    !arr1.some(obj1 => arr2.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));

  // Change date format to string
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Handle invalid date
  const [dateWarning, setDateWarning] = useState(false);

  const handleWarning = () => {
    setDateWarning(true);
  };

  useEffect(() => {
    if (dateWarning) {
      const timeoutId = setTimeout(() => {
        setDateWarning(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [dateWarning]);

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
          placeholderText='Set reservation date'
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: any) => {
            setDateRange(update);

            if (update[1] != null) {
              // const chosenDates = update.map((date: Date) => date.toISOString().substring(0, 10));
              const chosenDates = getDatesInRange(update[0], update[1])
              console.log(chosenDates, disabledDates)
              if (uniqueArrays(chosenDates, disabledDates)) {
                console.log("true")
                setDateRange(update);

              } else {
                handleWarning();
                console.log("false");
                setDateRange([null, null]);
              }
            }

          }}
          dateFormat="d MMM yyyy"
          minDate={new Date()}
          excludeDates={disabledDates}
          isClearable={true}
          clearButtonClassName="btn btn-ghost"
        />
      </div>

      <div className='flex justify-center static m-0 w-screen border-t-4 border-primary py-4'>
        <div
          className={`${dateWarning
            ? 'opacity-100 transition-opacity duration-500'
            : 'opacity-0 hidden transition-opacity duration-500'
            } alert alert-warning shadow-lg w-10/12`}
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Invalid Date</span>
          </div>
        </div>

        <div className={`${dateWarning
          ? 'opacity-0 transition-opacity duration-500 hidden'
          : 'opacity-100 transition-opacity duration-500'
          } flex items-center justify-between w-10/12`}>
          <div>
            {dateRange[1] !== null ?
              <p>{formatDate(dateRange[0] || new Date())} - {formatDate(dateRange[1] || new Date())}</p> :
              <></>
            }

            <p>Rp. {stay?.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}/night</p>
          </div>
          {dateRange[1] !== null ?
            <button className='btn btn-accent'>Reserve</button> :
            <button disabled className='btn btn-accent'>Reserve</button>
          }

        </div>

      </div>





    </Layout>
  )
}

export default DetailStay