import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";
import axios from 'axios';

// Component
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal'
import Input from '../../Components/Input';
import TextArea from '../../Components/TextArea';

//Icon
import { FaPenSquare } from 'react-icons/fa'
import { FaRoad } from 'react-icons/fa'
import { FaCloudUploadAlt } from 'react-icons/fa';
import ListingModal, { ListingFormValues } from '../../Components/ListingModal';

const ProfileHost = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [showBnb, setShowBnb] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchTableData = async () => {
        try {
            const response = await axios.get(`https://baggioshop.site/users`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2Nzg5NTMxNjAsInVzZXJJRCI6MX0.e48mDj4O-vZyFHA3XQ0MQYPhvWPG6PBziEawlEJh5ng'
                }
            });
            console.log("datatest: ", response.data.data.data);
            setData(response.data.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [`https://baggioshop.site/`]);

    useEffect(() => {

    }, [])

    const initialListingFormValues: ListingFormValues = {
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
        description: "",
        price: ""
    };

    const handleNewListing = (formValues: ListingFormValues) => {
        console.log(formValues)
        // setLoading(true);
        // axios
        //     .post(endpoint,
        //         {
        //             full_name: formValues.full_name,
        //             email: formValues.email,
        //             password: formValues.password,
        //             team: formValues.team,
        //             role: formValues.role,
        //             status: formValues.status
        //         },
        //         { headers: { Authorization: `Bearer ${cookies.userToken}` } }
        //     )
        //     .then(result => {
        //         console.log("Form submitted with values: ", result)
        //         fetchTableData();
        //     })
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false));
    }

    return (
        <Layout>
            <Navbar />
            <div className="text-white mt-10 w-9/12">
                <h1 className='text-4xl w-60 sm:w-full font-bold sm:text-2xl'>Personal Information</h1>
                <div className="grid grid-cols-2">

                    <div className="flex flex-col mt-10 space-y-3 w-60 sm:w-96">
                        <div>
                            <label htmlFor="name" className='text-l font-semibold sm:text-sm'>
                                Name
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>Marvin Mckiney</p>
                        </div>
                        <div>
                            <label htmlFor="email" className='text-l font-semibold sm:text-sm'>
                                Email
                            </label>
                            <p className='text-slate-300 text-l italic sm:text-sm'>Marvin@gmail.com</p>
                        </div>
                        <div>
                            <label htmlFor="phone_number" className='text-l font-semibold sm:text-sm'>
                                Phone Number
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>08923674327</p>
                        </div>
                        <div>
                            <label htmlFor="address" className='text-l font-semibold sm:text-sm'>
                                Address
                            </label>
                            <p className='text-slate-300 text-l sm:text-sm'>
                                4140 Parker Rd. Allentown, New Mexico 31134
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
                        size='sm:w-60 sm:btn-sm'
                        children={'View Your List Bnb'}
                        onClick={() => navigate('/list_bnb')}
                    />
                    <Button
                        color='btn-accent'
                        size='sm:w-60 sm:btn-sm sm:text-xs'
                        children={'Create New Bnb'}
                        onClick={() => setShowBnb(true)}
                    />
                </div>
                <div className="flex w-5/6 mt-20 mb-10">
                    <Button
                        color='btn-warning sm:btn-sm sm:text-xs'
                        children={'Delete Account'}
                        onClick={() => setShowDelete(true)}
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
                    onSubmit={handleNewListing}
                    initialFormValues={initialListingFormValues}
                    editMode={false}
                />
            </Modal>

            <Modal
                isOpen={showEdit}
                size='w-full h-full sm:w-96 sm:h-5/6'
                isClose={() => setShowEdit(false)}
            >
                <div className="text-white mt-10 w-9/12 flex flex-col justify-center sm:mx-auto">
                    <h1 className='text-4xl w-60 font-bold'>Personal Information</h1>
                    <div className="grid grid-cols-2">

                        <div className="flex flex-col mt-10 space-y-3 w-60">
                            <div>
                                <Input
                                    type='text'
                                    label='Name'
                                    name='name'
                                    placeholder='Marvin Mckiney'
                                />
                            </div>
                            <div>
                                <Input
                                    type='email'
                                    label='Email'
                                    name='email'
                                    placeholder='Marvin@gmail.com'
                                />
                            </div>
                            <div>
                                <Input
                                    type='number'
                                    label='Phone Number'
                                    name='phone_number'
                                    placeholder='08923674327'
                                />
                            </div>
                            <div>
                                <TextArea
                                    label='Address'
                                    name='address'
                                    placeholder='4140 Parker Rd. Allentown, New Mexico 31134'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            color="btn-accent"
                            size='mt-5'
                            children={"Save"}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={showDelete}
                isClose={() => setShowDelete(false)}
                size='w-80'
            >
                <div className="flex flex-col justify-center">
                    <h1 className='text-2xl text-center'>Are You Sure To Delete Your Account ?</h1>
                    <div className="flex flex-row justify-center space-x-4">
                        <Button
                            color="btn-warning"
                            size='mt-5'
                            children={"Cancel"}
                        />
                        <Button
                            color="btn-accent"
                            size='mt-5'
                            children={"Yes, I Sure"}
                        />
                    </div>

                </div>
            </Modal>
        </Layout>
    )
}

export default ProfileHost