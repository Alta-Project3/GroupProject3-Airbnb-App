import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";

// Component
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal'
import { FaPenSquare } from 'react-icons/fa'
import { FaRoad } from 'react-icons/fa'

const ProfileHost = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)

    return (
        <Layout>
            <Navbar/>
            <div className="text-white mx-10 mt-10 w-screen">
                <h1 className='text-4xl w-60 font-bold'>Personal Information</h1>
                <div className="grid grid-cols-2">

                <div className="flex flex-col mt-10 space-y-3 w-60">
                    <div>
                        <label htmlFor="name" className='text-l font-semibold'>
                            Name
                        </label>
                        <p className='text-slate-300 text-l'>Marvin Mckiney</p>
                    </div>
                    <div>
                        <label htmlFor="email" className='text-l font-semibold'>
                            Email
                        </label>
                        <p className='text-slate-300 text-l italic'>Marvin@gmail.com</p>
                    </div>
                    <div>
                        <label htmlFor="phone_number" className='text-l font-semibold'>
                            Phone Number
                        </label>
                        <p className='text-slate-300 text-l'>08923674327</p>
                    </div>
                    <div>
                        <label htmlFor="address" className='text-l font-semibold'>
                            Address
                        </label>
                        <p className='text-slate-300 text-l'>
                        4140 Parker Rd. Allentown, New Mexico 31134
                        </p>
                    </div>                    
                </div>
                <div className="flex w-20 ml-10 space-x-2 mt-8">
                    <Button
                    color='accent'
                    size='btn-sm text-xl'
                    children={<FaPenSquare/>}
                    />
                    <Button
                    color='white'
                    size='btn-sm text-xl'
                    children={<FaRoad/>}
                    />
                </div> 
                </div>
                <div className="flex flex-col w-5/6 justify-between mt-10 space-y-3">
                    <Button
                    color='accent'
                    size='w-full'
                    children={'View Your List Bnb'}
                    />
                    <Button
                    color='accent'
                    size='w-full'
                    children={'Create New Bnb'}
                    onClick={() => setShowModal(true)}
                    />
                </div>
                <div className="flex w-5/6 justify-between mt-40">
                    <Button
                    color='warning text-white'
                    children={'Delete Account'}
                    />
                </div> 
            </div>
            <Modal
            title='Set Your bnb'
            children={"test"}
            isOpen={showModal}
            size='w-full h-full'
            isClose={()=> setShowModal(false)}
            />
        </Layout> 
    )
}

export default ProfileHost