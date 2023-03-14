import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import Input from './Input'
import TextArea from './TextArea'
import { FaCloudUploadAlt } from 'react-icons/fa';

export interface ListingFormValues {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    price: number | string;
};

// const initialFormValues: ListingFormValues = {
//     name: "",
//     address: "",
//     latitude: 0,
//     longitude: 0,
//     description: "",
//     price: 0
// };

interface ListingProps {
    initialFormValues: ListingFormValues;
}

const ListingModal: React.FC<ListingProps> = ({ initialFormValues }) => {
    const [formValues, setFormValues] = useState<ListingFormValues>(initialFormValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormValues(initialFormValues);
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className='flex flex-col w-60 sm:w-80'>
                <Input
                    type='text'
                    label='Name'
                    name='name'
                    placeholder='set room name'
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <TextArea
                    label='Address'
                    name='address'
                    placeholder='enter home address'
                    value={formValues.address}
                    onChange={handleTextAreaChange}
                />
                <TextArea
                    label='Description'
                    name='description'
                    placeholder='enter your home descrption'
                    value={formValues.description}
                    onChange={handleTextAreaChange}
                />

                <label className='mb-2 font-light block' htmlFor="price">Price/night</label>
                <CurrencyInput
                    className='input input-primary bg-primary'
                    id="price"
                    name="price"
                    prefix='Rp. '
                    decimalSeparator=','
                    groupSeparator='.'
                    placeholder="Rp. "
                    value={formValues.price}
                    decimalsLimit={2}
                    onValueChange={(value, name) => setFormValues({ ...formValues, price: value ? parseInt(value) : 0 })}
                />

                {/* <Input
                    type='number'
                    label='Price/night'
                    name='price'
                    placeholder='Rp.250.000.00'
                    value={formValues.name}
                    onChange={handleInputChange}
                /> */}

                <div className="flex flex-col justify-center w-full mt-2">
                    <label htmlFor="">
                        Your Home Photos
                    </label>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30  rounded-lg cursor-pointer bg-primary dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaCloudUploadAlt className='text-6xl text-gray-400' />
                            <p className="mb-2 text-sm text-gray-400 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-400 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id='dropzone-file' type="file" className="hidden" />
                    </label>
                </div>

                <button type='submit' className='btn btn-accent'>Save</button>
            </form>
        </div>
    )
}

export default ListingModal