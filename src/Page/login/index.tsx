import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import Input from '../../Components/Input'

interface FormValues {
  email: string;
  password: string;
}

const initialFormValues: FormValues = {
  email: "",
  password: ""
};

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValues(initialFormValues);
  };

  return (
    <Layout>
      <div className='flex flex-col h-screen w-9/12 justify-between'>

        <div className='mt-10'></div>

        <form className='flex flex-col' onSubmit={handleSubmit}>
          <h1 className="text-center font-semibold text-4xl">Altabnb</h1>
          <Input
            type='email'
            label='Email'
            name='email'
            value={formValues.email}
            placeholder='enter your email'
            onChange={handleInputChange}
          />
          <Input
            type='password'
            label='Password'
            name='password'
            value={formValues.password}
            placeholder='enter your password'
            onChange={handleInputChange}
          />
          <button type='submit' className='self-center btn btn-accent w-1/2 my-2'>Sign In</button>
          {/* <button type='submit' className='self-center btn btn-accent w-1/2 my-2'><Link to={"/home"}>Sign In</Link></button> */}

          <h3 className='text-l text-center mt-2'>Not on AltaBnb yet? <Link to={"/register"} className='underline hover:text-accent'>Sign Up</Link> </h3>
        </form>



        <h2 className='text-xl text-accent font-semibold text-center mb-10'>Powered by Group2</h2>

      </div>
    </Layout>


  )
}

export default Login