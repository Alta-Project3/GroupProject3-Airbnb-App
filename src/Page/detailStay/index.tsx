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
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Rating } from '@smastrom/react-rating';

const DetailStay = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const [showModal, setShowModal] = useState(false);

  // Get stay ID from url
  const { stayId } = useParams()
  const [stay, setStay] = useState(stays.find(({ id }) => id === parseInt(stayId || "")))

  // API
  const endpoint = "https://baggioshop.site/rooms/"
  const fetchDetails = async () => {
    await axios
      .get(`${endpoint}${stayId}`, {
        headers: { Authorization: `Bearer ${cookies.session}` },
      })
      .then((res) => {
        setStay(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // Rating
  const StarDrawing = (
    <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="#fdd231" stroke-width="1" ></path>
  );

  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: '#fdd231',
    inactiveFillColor: '#0b3c95',

  };

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
    // fetchDetails();

    if (dateWarning) {
      const timeoutId = setTimeout(() => {
        setDateWarning(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [dateWarning, endpoint]);

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
      <div className='hidden md:flex'>
        <Navbar>

        </Navbar>
      </div>

      <div className='flex flex-col justify-center w-screen md:w-10/12'>
        <h1 className='hidden md:flex text-4xl font-semibold my-4'>{stay?.name}</h1>
        <div className='grid gap-4 grid-cols-3'>
          <div className='col-span-3 md:col-span-2 w-full'>
            <img className='md:rounded-lg' src={stay?.image} alt="image" />
          </div>

          <div className='hidden md:flex md:flex-col justify-end'>
            <h2 className="flex flex-col justify-center gap-2 items-begin mb-4">
              <p className='text-2xl font-semibold'>{stay?.location}</p>
              <Rating
                value={stay ? stay.rating : 0}
                style={{ maxWidth: 160 }}
                itemStyles={customStyles}
                readOnly
              />
            </h2>
            <p className='font-light lg:line-clamp-14 line-clamp-10'>
              {stay?.description}
            </p>
            <button
              className='self-start font-semibold underline hover:text-accent'
              onClick={() => setShowModal(true)}
            >
              Show More
            </button>
          </div>

        </div>

      </div>


      <div className='flex flex-col w-10/12 md:w-8/12 gap-2 my-2'>
        <div className='md:hidden'>
          <h1 className='text-2xl font-semibold mb-2'>{stay?.name}</h1>
          <h2 className="flex justify-begin gap-2 items-center">
            <div className="badge badge-accent"><AiFillStar />{stay?.rating}</div>
            <p className='font-semibold'>{stay?.location}</p>
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
        </div>

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