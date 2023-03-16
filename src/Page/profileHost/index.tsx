import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";
import axios from 'axios';
import Swal from 'sweetalert2';

// Component
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal'
import Input from '../../Components/Input';
import TextArea from '../../Components/TextArea';
import ListingModal, { ListingFormValues } from '../../Components/ListingModal';

//Icon
import { FaPenSquare } from 'react-icons/fa'
import { FaRoad } from 'react-icons/fa'
import { FaCloudUploadAlt } from 'react-icons/fa';


interface FormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const initialFormValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
};



const ProfileHost = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [cookies, setCookie, removeCookie] = useCookies(['session', 'role'])
    const endpoint = `https://baggioshop.site/users`
    const [showBnb, setShowBnb] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState()
    const Role = 'Host'
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [file, setFile] = useState<File | any>(null)


    const fetchDataUser = async () => {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.session}` 
                }
            });
            setData(response.data.data);
            setId(response.data.data.id)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [endpoint]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            setFile(files[0]);
        };
    }

    const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("email", formValues.email);
        formData.append("phone", formValues.phone);
        formData.append("address", formValues.address);
        formData.append("profile_picture", file);
        axios.put(endpoint, formData,
                { headers: { 
                    Authorization: `Bearer ${cookies.session}`,
                    Accept: 'application/json',
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then(result => {
                console.log("Form submitted with values: ", result)
                fetchDataUser();
                setShowEdit(false)
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    iconColor: '#FDD231',
                    padding: '1em',
                    title: 'Successfuly Edit Account',
                    color: '#ffffff',
                    background: '#0B3C95 ',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    } 

    const handleUpgradeUser = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            color: '#ffffff',
            background: '#0B3C95 ',
            confirmButtonColor: "#FDD231",
            cancelButtonColor: "#FE4135",
        }).then((willUpgrade)=> {
            if(willUpgrade.isConfirmed){
                axios.post(`${endpoint}/upgrade`,{
                    approvement: "yes",
                },
                {
                    headers:{
                        Authorization: `Bearer ${cookies.session}`,
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    }
                })
                .then((response)=> {
                    console.log(response.data.data.role)
                    setCookie('role', response.data.data.role, { path: "/" });
                    Swal.fire({
                        position: 'top-start',
                        icon: 'success',
                        iconColor: '#FDD231',
                        padding: '1em',
                        title: "You're Host Now",
                        color: '#ffffff',
                        background: '#0B3C95 ',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    fetchDataUser()
                })
                .catch((error) =>{console.log(error)})
                .finally(()=> setLoading(false))
            }
        })
    }

    const handleDeleteUser = () => {
        Swal.fire({
            title: `Are you sure delete account ${data.name}?`,
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
                axios.delete(endpoint,{
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
                        title: 'Successfuly Delete Account',
                        color: '#ffffff',
                        background: '#0B3C95 ',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    removeCookie('session');
                    removeCookie('role');
                    navigate("/");
                })
            }
        })
    }

    const roomEndpoint = `https://baggioshop.site/rooms`
    
    // const initialListingFormValues: ListingFormValues = {
    //     name: "",
    //     address: "",
    //     latitude: 0,
    //     longitude: 0,
    //     description: "",
    //     price: "",
    //     file: '',
    // };

    const myKey = '71097a12eab542b5b01173f273f24c96'
    

    // const handleNewListing = (formValues: ListingFormValues) => {
    //     console.log(formValues)
    //     setLoading(true);
    //     axios.get(`https://api.geoapify.com/v1/geocode/search?text=${formValues.address}&apiKey=${myKey}`)
    //     .then(response => {
    //         setLat(response.data.features[0].properties.lat)
    //         setLon(response.data.features[0].properties.lon)
    //         console.log("lat", response.data.features[0].properties.lat);
    //         console.log("lon", response.data.features[0].properties.lon);
    //         axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${response.data.features[0].properties.lat}&lon=${response.data.features[0].properties.lon}&apiKey=${myKey}`)
    //         .then(response => {
    //             const formData = new FormData();
    //             formData.append('room_picture', formValues.file);
    //             formData.append('room_name', formValues.name);
    //             formData.append('address', response.data.features[0].properties.city);
    //             formData.append('description', formValues.description);
    //             formData.append('price', formValues.price);
    //             formData.append('latitude', response.data.features[0].properties.lat);
    //             formData.append('longitude', response.data.features[0].properties.lon);
    //             axios.post(roomEndpoint, formData,
    //                 { headers: { 
    //                     Authorization: `Bearer ${cookies.session}`,
    //                     Accept: 'application/json',
    //                     "Content-Type" : 'multipart/form-data'
    //                 }
    //             }
    //             )
    //             .then(result => {
    //                 console.log("Form submitted with values: ", result)
                    
    //             })
    //             .catch((error) => {
    //             Swal.fire({
    //                 title: "Failed",
    //                 icon: "error",
    //                 iconColor: '#FDD231',
    //                 showCancelButton: true,
    //                 confirmButtonText: "Yes",
    //                 cancelButtonText: "No",
    //                 color: '#ffffff',
    //                 background: '#0B3C95 ',
    //                 confirmButtonColor: "#FDD231",
    //                 cancelButtonColor: "#FE4135",
    //             })
    //             console.log(error)
    //             })
    //             .finally(() => setLoading(false));
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }
    
    return (
        <Layout>
            <Navbar />
            <div className="text-white mt-10 w-9/12">
                <h1 className='text-4xl w-60 sm:w-full font-bold sm:text-2xl'>Personal Information</h1>
                <div className="grid grid-cols-2">

                    <div className="flex flex-col mt-10 space-y-3 w-60 sm:w-96">
                        <div className='border-b-2 border-primary'>
                            <label htmlFor="name" className='text-l font-semibold sm:text-sm'>
                                Name
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>{data.name}</p>
                        </div>
                        <div className='border-b-2 border-primary'>
                            <label htmlFor="email" className='text-l font-semibold sm:text-sm'>
                                Email
                            </label>
                            <p className='text-slate-300 text-l italic sm:text-sm'>{data.email}</p>
                        </div>
                        <div className='border-b-2 border-primary'>
                            <label htmlFor="phone_number" className='text-l font-semibold sm:text-sm'>
                                Phone Number
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>{data.phone}</p>
                        </div>
                        <div className='border-b-2 border-primary'>
                            <label htmlFor="address" className='text-l font-semibold sm:text-sm'>
                                Address
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>
                                {data.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-20 ml-10 space-x-2 mt-8 sm:ml-32 md:ml-40">
                        <Button
                            color='btn-accent'
                            size='btn-sm text-xl'
                            children={<FaPenSquare />}
                            onClick={() => setShowEdit(true)}
                        />
                        <Button
                            color='btn-white'
                            size='btn-sm sm:text-primary text-xl'
                            children={<FaRoad />}
                            onClick={() => navigate('/trip')}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-5/6 justify-between mt-10 space-y-3">
                    <Button
                        color='btn-accent sm:btn-accent sm:text-primary sm:text-xs'
                        size={`sm:w-60 sm:btn-sm  ${cookies.role === Role ? 'static' : 'hidden'}`}
                        children={'View Your List Bnb'}
                        onClick={() => navigate(`/list_bnb/${data.id}`,{
                                state:{
                                    id: data.id
                                }
                            }
                        )}
                    />
                    <Button
                        color='btn-accent'
                        size='sm:w-60 sm:btn-sm sm:text-xs'
                        children={cookies.role === Role ? 'Create New Bnb' : 'Make your home Bnb ?'}
                        onClick={cookies.role === Role ? () => setShowBnb(true) : handleUpgradeUser}
                    />
                </div>
                <div className="flex w-5/6 mt-20 mb-10">
                    <Button
                        color='btn-warning sm:btn-sm sm:text-xs'
                        children={'Delete Account'}
                        onClick={handleDeleteUser}
                    />
                </div>
            </div>
            <Modal
                title='Set Your bnb'
                isOpen={showBnb}
                size='w-full h-full sm:h-5/6 sm:w-8/12 md:w-96'
                isClose={() => setShowBnb(false)}
            >
                <ListingModal
                    // onSubmit={handleNewListing}
                    // initialFormValues={initialListingFormValues}
                    // editMode={false}
                />
            </Modal>

            <Modal
                isOpen={showEdit}
                size='w-full h-full sm:w-96 sm:h-5/6'
                isClose={() => setShowEdit(false)}
            >   
                <div className="text-white mt-10 w-9/12 flex flex-col justify-center sm:mx-auto">
                    <h1 className='text-4xl w-60 font-bold'>Personal Information</h1>
                    <form onSubmit={handleEditUser}>
                    <div className="grid grid-cols-2">
                            <div className="flex flex-col mt-10 space-y-3 w-60">
                                <div>
                                    <Input
                                        type='text'
                                        label='Name'
                                        name='name'
                                        placeholder={`${data.name}`}
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type='email'
                                        label='Email'
                                        name='email'
                                        placeholder={`${data.email}`}
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type='number'
                                        label='Phone Number'
                                        name='phone'
                                        placeholder={`${data.phone}`}
                                        value={formValues.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <TextArea
                                        label='Address'
                                        name='address'
                                        placeholder={`${data.address}`}
                                        value={formValues.address}
                                        onChange={handleTextAreaChange}
                                    />
                                </div>
                                <div>
                                    <Input
                                    type='file'
                                    label='Your Room Photo'
                                    name='file'
                                    classes='file-input file-input-primary'
                                    placeholder='set room name'
                                    onChange={handleFileInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type='submit'
                                color="btn-accent"
                                size='mt-5'
                                children={"Save"}
                            />
                        </div>
                        </form>
                </div>
            </Modal>
        </Layout>
    )
}

export default ProfileHost