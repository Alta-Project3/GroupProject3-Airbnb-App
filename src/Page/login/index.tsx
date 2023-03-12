import React from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import Input from '../../Components/Input'

const Login = () => {
  return (
    <Layout>
      <div className='flex flex-col h-screen w-9/12 justify-between'>

        <div className='mt-10'></div>

        <form className='flex flex-col' action="">
          <h1 className="text-center font-semibold text-4xl">Altabnb</h1>
          <label htmlFor="email"> Email</label>
          <input id='email' type="text" className='input input-primary bg-primary mb-2' />
          <label htmlFor="Password"> Password</label>
          <input id='Password' type="password" className='input input-primary bg-primary mb-2' />
          <button type='submit' className='self-center btn btn-accent w-1/2 my-2'><Link to={"/home"}>Sign In</Link></button>

          <h3 className='text-l text-center mt-2'>Not on AltaBnb yet? <Link to={"/register"} className='underline hover:text-accent'>Sign Up</Link> </h3>
        </form>



        <h2 className='text-xl text-accent font-semibold text-center mb-10'>Powered by Group2</h2>

      </div>
    </Layout>


  )
}

export default Login