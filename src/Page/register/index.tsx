import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import Input from '../../Components/Input'

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const initialFormValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: ""
};

// const initialFormValues = {} as FormValues;

const Register = () => {
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
      <div className='flex flex-col h-screen justify-between w-9/12'>
        <div className='mt-10'></div>
        <form className='flex flex-col' action="">
          <h1 className="text-center font-semibold text-4xl">Sign Up</h1>
          <Input
            type='text'
            label='Name'
            name='name'
            value={formValues.name}
            placeholder='enter your name'
            onChange={handleInputChange}
          />
          <Input
            type='email'
            label='Email'
            name='email'
            value={formValues.email}
            placeholder='enter your email'
            onChange={handleInputChange}
          />
          <Input
            type='number'
            label='Phone'
            name='phone'
            value={formValues.phone}
            placeholder='enter your phone number'
            onChange={handleInputChange}
          />
          <Input
            type='text'
            label='Address'
            name='address'
            value={formValues.address}
            placeholder='enter your address'
            onChange={handleInputChange}
          />
          <Input
            type='password '
            label='Password'
            name='password'
            value={formValues.password}
            placeholder='enter your password'
            onChange={handleInputChange}
          />
          <button type='submit' className='self-center btn btn-accent w-1/2 my-2'><Link to={"/home"}>Sign Up</Link></button>
        </form>
        <h2 className='text-xl text-accent font-semibold text-center mb-10'>Powered by Group2</h2>

      </div>
    </Layout>
  )
}

export default Register