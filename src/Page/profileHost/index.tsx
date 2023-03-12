import React from 'react'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'

const ProfileHost = () => {
    return (
        <Layout>
            <Navbar/>
            <div className="text-white w-40">
                <h1>Personal Information</h1>
            </div>
        </Layout>
    )
}

export default ProfileHost