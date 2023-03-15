import React, { useEffect, useState } from 'react'
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
    file:  string
};

interface ListingProps {
    onSubmit: (formValues: ListingFormValues) => void;
    initialFormValues: ListingFormValues;
    editMode: boolean;
}

const ListingModal: React.FC<ListingProps> = ({ onSubmit, initialFormValues, editMode }) => {
    const [formValues, setFormValues] = useState<ListingFormValues>(initialFormValues);

    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(initialFormValues);
        }
    }, [initialFormValues, editMode]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues,[e.target.files[0]]: e.target.value})
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
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

                <Input
                    type='file'
                    label='Your Room Photo'
                    name='file'
                    classes='file-input file-input-primary'
                    placeholder='set room name'
                    value={formValues.file}
                    onChange={handleFileInputChange}
                />

                <button type='submit' className='btn btn-accent'>Save</button>
            </form>
        </div>
    )
}

export default ListingModal