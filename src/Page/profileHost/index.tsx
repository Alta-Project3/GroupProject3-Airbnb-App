import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";

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

    const initialListingFormValues: ListingFormValues = {
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
        description: "",
        price: ""
    };

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
                    initialFormValues={initialListingFormValues}
                />
                {/* <div className="flex justify-center">
                    <form className='flex flex-col w-60 sm:w-80'>
                        <Input
                            type='text'
                            label='Name'
                            name='name'
                            placeholder='set room name'
                        />
                        <TextArea
                            label='Address'
                            name='address'
                            placeholder='enter home address'
                        />
                        <TextArea
                            label='Description'
                            name='description'
                            placeholder='enter your home descrption'
                        />
                        <Input
                            type='number'
                            label='Price'
                            name='price'
                            placeholder='Rp.250.000.00 /nigth'
                        />

                        <div className="flex flex-col justify-center w-full mt-2">
                            <label htmlFor="">
                                Your Home Photos
                            </label>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30  rounded-lg cursor-pointer bg-primary dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FaCloudUploadAlt className='text-6xl text-gray-400'/>
                                    <p className="mb-2 text-sm text-gray-400 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id='dropzone-file' type="file" className="hidden" />
                            </label>
                        </div> 

                        <Button
                        color="btn-accent"
                        size='mt-5'
                        children={"Save"}
                        />
                    </form>
                </div> */}
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