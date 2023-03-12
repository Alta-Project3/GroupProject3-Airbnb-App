import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'

const Register = () => {
  return (
    <Layout>
      <div className='flex flex-col h-screen justify-between w-9/12'>

        <div className='mt-10'></div>

        <form className='flex flex-col' action="">
          <h1 className="text-center font-semibold text-4xl">Sign Up</h1>
          <label htmlFor="name"> Name</label>
          <input id='name' type="text" className='input input-primary bg-primary mb-2' />
          <label htmlFor="email"> Email</label>
          <input id='email' type="text" className='input input-primary bg-primary mb-2' />
          <label htmlFor="phone"> Phone Number</label>
          <input id='phone' type="number" className='input input-primary bg-primary mb-2' />
          <label htmlFor="address"> Address</label>
          <input id='address' type="text" className='input input-primary bg-primary mb-2' />
          <label htmlFor="Password"> Password</label>
          <input id='Password' type="password" className='input input-primary bg-primary mb-2' />
          <button type='submit' className='self-center btn btn-accent w-1/2 my-2'><Link to={"/home"}>Sign Up</Link></button>
        </form>



        <h2 className='text-xl text-accent font-semibold text-center mb-10'>Powered by Group2</h2>

      </div>
    </Layout>
  )
}

export default Register