import React, {useState} from 'react'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Modal from '../../Components/Modal'
import Button from '../../Components/Button'

const ProfileHost = () => {
    
    const [showModal, setShowModal] = useState(false)

    return (
        <Layout>
            <Navbar/>
            <div className="text-white mx-10 mt-10 w-screen">
                <h1 className='text-4xl w-60 font-bold'>Personal Information</h1>
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
                <div className="flex w-5/6 justify-between mt-8">
                    <button className="btn btn-accent text-primary font-bold">Edit Profile</button>
                    <button className="btn btn-white text-primary font-bold">Your Trip</button>
                </div> 
                <div className="flex flex-col w-5/6 justify-between mt-10 space-y-3">
                    <button className="btn btn-accent text-primary font-bold w-full">View Your List Bnb</button>
                    <button className="btn btn-accent text-primary font-bold w-full"
                    onClick={()=> setShowModal(true)}
                    >Create New bnb</button>
                </div>
                <div className="flex w-5/6 justify-between mt-40">
                    <button className="btn btn-warning text-primary font-bold text-white">Delete Account</button>
                </div> 
            </div>
            <Modal
            title='Set Your bnb'
            children={"test"}
            isOpen={showModal}
            isClose={()=> setShowModal(false)}
            />
        </Layout> 
    )
}

export default ProfileHost