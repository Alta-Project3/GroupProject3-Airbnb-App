import React,{useState} from 'react'

import Layout from '../../Components/Layout'
import Navbar from '../../Components/Navbar'
import ListingCards from '../../Components/ListingCards'
import Button from '../../Components/Button'
import Modal from '../../Components/Modal'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'

import { FaCloudUploadAlt } from 'react-icons/fa';


const Listing = () => {

  const [showEdit, setShowEdit] = useState(false)
  const [showBnb, setShowBnb] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  return (
    <Layout>
      <Navbar
      children={<h1 className="font-bold text-2xl">Your Listings</h1>}
      />
        <div className="flex flex-col mt-4 gap-4 w-full items-center">
        <ListingCards
          id={1}
          location='Bogor, Indonesia'
          rating={4.5}
          available="Apr 10 - 15"
          price={2500000}
          image="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-dskt/tix-hotel/images-web/2021/03/12/c787bd29-4af1-4a4a-971f-a0df8cadaee7-1615563884519-157817001f6a78b890369fcbb737fc07.jpg"
          handleEdit={()=> setShowEdit(true)}
          edit={true}
          toDelete={true}
          handleDelete={() => setShowDelete(true)}
        />

        <ListingCards
          id={1}
          location='Bogor, Indonesia'
          rating={4.7}
          available="Apr 20 - 29"
          price={1700000}
          image="https://www.amesbostonhotel.com/wp-content/uploads/2021/09/Rekomendasi-Penginapan-Villa-di-Bogor.jpg"
          handleEdit={()=> setShowEdit(true)}
          toDelete={true}
          handleDelete={() => setShowDelete(true)}
          edit={true}
        />
        <ListingCards
          id={1}
          location='Bogor, Indonesia'
          rating={4.7}
          available="Apr 20 - 29"
          price={1700000}
          image="https://www.amesbostonhotel.com/wp-content/uploads/2021/09/Rekomendasi-Penginapan-Villa-di-Bogor.jpg"
          handleEdit={()=> setShowEdit(true)}
          toDelete={true}
          handleDelete={() => setShowDelete(true)}
          edit={true}
        />
        </div>



        <Button
        size='w-12 h-12 rounded-full fixed bottom-10 right-5 z-50 text-4xl'
        color='btn-accent'
        children='+'
        onClick={()=> setShowBnb(true)}
        />

        <Modal
            title='Set Your bnb'
            isOpen={showBnb}
            size='w-full min-h-screen'
            isClose={()=> setShowBnb(false)}
            >
                <div className="flex justify-center">
                    <form className='flex flex-col w-60'>
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
                                <input type="file" className="hidden" />
                            </label>
                        </div> 

                        <Button
                        color="btn-accent"
                        size='mt-5'
                        children={"Save"}
                        />
                    </form>
                </div>
            </Modal>

        <Modal
            title='Edit Your bnb'
            isOpen={showEdit}
            size='w-full min-h-screen'
            isClose={()=> setShowEdit(false)}
            >
                <div className="flex justify-center">
                    <form className='flex flex-col w-60'>
                        <Input
                            type='text'
                            label='Name'
                            name='name'
                            placeholder='Villa Boscha'
                        />
                        <TextArea
                            label='Address'
                            name='address'
                            placeholder='Jl. Boscha V No.80, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161'
                        />
                        <TextArea
                            label='Description'
                            name='description'
                            placeholder='It is a luxury Bali resort style villa located close to Bogor Taman Safari.  private garden with  private swimming pool can be used independently. It is a beautiful....'
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
                                <input type="file" className="hidden" />
                            </label>
                        </div> 

                        <Button
                        color="btn-accent"
                        size='mt-5'
                        children={"Save"}
                        />
                    </form>
                </div>
            </Modal>

            <Modal
                isOpen={showDelete}
                isClose={() => setShowDelete(false)}
                size='w-80'
            >
                <div className="flex flex-col justify-center">
                    <h1 className='text-2xl text-center'>Are You Sure To Delete this Room ?</h1>
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

export default Listing