import React,{useState, useEffect} from 'react'
import axios from "axios"
import Swal from 'sweetalert2'

import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import ListingCards from '../../Components/ListingCards'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import ListingModal,{ ListingFormValues } from '../../Components/ListingModal'

import { useCookies } from 'react-cookie'

import { FaCloudUploadAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'





const Listing = () => {
  
  const params = {
    access_key: '3c633bc54e0e5f7ea6b161ad1c4806cf',
    query: '1600 Pennsylvania Ave NW'
  }
  const [showEdit, setShowEdit] = useState(false)
  const [showBnb, setShowBnb] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const [loading, setLoading] = useState(false)
  const [room, setRooms] = useState([])
  const location = useLocation()
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  
  
  const endpoint = `https://baggioshop.site/users`
  
  const id = location.state.id
  
  const fetchRoomData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/${location?.state?.id}/rooms`,
        { headers: { Authorization: `Bearer ${cookies.session}` } }
        );
        console.log("room data: ", response.data.data);
        setRooms(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(true);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [endpoint]);
  
  
  // useEffect(() => {
    //   axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=51.52016005&lon=-0.16030636023550826&apiKey=71097a12eab542b5b01173f273f24c96`)
    //     .then(response => {
      //       console.log("from Geometry", response.data);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   axios.get(`https://api.geoapify.com/v1/geocode/search?text=Gedung%20Sate,%20Bandung%20Indonesia&apiKey=71097a12eab542b5b01173f273f24c96`)
  //     .then(response => {
  //       console.log("From Address", response.data);
  //     }).catch(error => {
    //       console.log(error);
  //     });
  //   }, [])

    const roomEndpoint = `https://baggioshop.site/rooms`

    const handleDeleteRoom = (id:any) => {
      Swal.fire({
        title: `Are you sure delete this room ?`,
          text: "You will not be able to recover your data!",
          icon: "warning",
          iconColor: '#FDD231',
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          color: '#ffffff',
          background: '#0B3C95 ',
          confirmButtonColor: "#FDD231",
          cancelButtonColor: "#FE4135",
      }).then((willDelete) => {
          if(willDelete.isConfirmed) {
              axios.delete(`https://baggioshop.site/rooms/${id}`,{
                  headers:{
                      Authorization: `Bearer ${cookies.session}`,
                      Accept: 'application/json'
                  }
              }).then((response)=> {
                  Swal.fire({
                      position: 'top-start',
                      icon: 'success',
                      iconColor: '#FDD231',
                      padding: '1em',
                      title: 'Successfuly Delete Room',
                      color: '#ffffff',
                      background: '#0B3C95 ',
                      showConfirmButton: false,
                      timer: 1200
                  })
                  fetchRoomData()
              })
          }
      })
  }
  const initialListingFormValues: ListingFormValues = {
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    description: "",
    price: "",
};

const myKey = '71097a12eab542b5b01173f273f24c96'

const handleNewListing = (formValues: ListingFormValues) => {
    console.log(formValues)
    setLoading(true);
    axios.get(`https://api.geoapify.com/v1/geocode/search?text=${formValues.address}&apiKey=${myKey}`)
    .then(response => {
        setLat(response.data.features[0].properties.lat)
        setLon(response.data.features[0].properties.lon)
        console.log("lat", response.data.features[0].properties.lat);
        console.log("lon", response.data.features[0].properties.lon);
        axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${response.data.features[0].properties.lat}&lon=${response.data.features[0].properties.lon}&apiKey=${myKey}`)
        .then(response => {
            const formData = new FormData();
            formData.append('file', formValues.file);
            axios.post(roomEndpoint,
                {
                    user_id : id,
                    room_name : formValues.name,
                    price : formValues.price,
                    description : formValues.description,
                    latitude : response.data.features[0].properties.lat,
                    longitude : response.data.features[0].properties.lon,
                    address : response.data.features[0].properties.city,
                    room_picture : formData
                },
                { headers: { 
                    Authorization: `Bearer ${cookies.session}`,
                    Accept: 'application/json',
                    "Content-Type" : 'multipart/form-data'
                }
            }
            )
            .then(result => {
                console.log("Form submitted with values: ", result)
                setShowBnb(false)
                fetchRoomData()
            })
            .catch((error) => {
            Swal.fire({
                title: "Failed",
                icon: "error",
                iconColor: '#FDD231',
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                color: '#ffffff',
                background: '#0B3C95 ',
                confirmButtonColor: "#FDD231",
                cancelButtonColor: "#FE4135",
            })
            console.log(error)
            })
            .finally(() => setLoading(false));
        }).catch(error => {
            console.log(error);
        });
    }).catch(error => {
        console.log(error);
    })
}

  return (
    <Layout>
      <Navbar
      children={<h1 className="font-bold text-2xl">Your Listings</h1>}
      />
        <div className="flex flex-col mt-4 gap-10 w-full justify-center sm:mt-10 sm:grid sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 xl:grid-cols-4">
        { room && loading === true ?(
          room.map((item:any, index:any)=> {
            return(
              <ListingCards
              key={item.id}
              id={item.id}
              location={item.address}
              rating={item.rating}
              available={item.available}
              price={item.price}
              image={item.room_picture}
              handleEdit={()=> setShowEdit(true)}
              toDelete={true}
              handleDelete={()=>handleDeleteRoom(item.id)}
              edit={true}
              />
            )
          })
        ) : (
          <h1>Loading</h1>
        )        }
        <ListingCards
          id={1}
          location='Bogor, Indonesia'
          rating={4.7}
          available="Apr 20 - 29"
          price={1700000}
          image="https://www.amesbostonhotel.com/wp-content/uploads/2021/09/Rekomendasi-Penginapan-Villa-di-Bogor.jpg"
          handleEdit={()=> setShowEdit(true)}
          toDelete={true}
          handleDelete={() => setShowDelete(true)}
          edit={true}
        />
        </div>



        <Button
        size='w-12 h-12 rounded-full fixed bottom-10 right-5 z-50 text-4xl'
        color='btn-accent'
        children='+'
        onClick={()=> setShowBnb(true)}
        />

        <Modal
            title='Set Your bnb'
            isOpen={showBnb}
            size='w-full h-full sm:h-5/6 sm:w-8/12 md:w-96'
            isClose={()=> setShowBnb(false)}
            >
              <ListingModal
                    onSubmit={handleNewListing}
                    initialFormValues={initialListingFormValues}
                    editMode={false}
                />
            </Modal>

        <Modal
            title='Edit Your bnb'
            isOpen={showEdit}
            size='w-full h-full sm:h-5/6 sm:w-8/12 md:w-96'
            isClose={()=> setShowEdit(false)}
            >
                <ListingModal
                    onSubmit={handleNewListing}
                    initialFormValues={initialListingFormValues}
                    editMode={true}
                />
            </Modal>

    </Layout>
  )
}

export default Listing