import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import { Rating } from '@smastrom/react-rating' 

interface FeedBackProps {
    id: number;
    location: string;
    available: string;
    price: number;
    image: string;
    edit?: boolean
    toDelete?: boolean
    handleFeedback?: React.MouseEventHandler
    handleEdit?: React.MouseEventHandler
    value?: any
}


const FeedBackCard: React.FC<FeedBackProps> = ({
    id, 
    location, 
    available, 
    price, 
    image, 
    edit, 
    handleEdit,
    handleFeedback,
    toDelete,
    value
}) => {

    const navigate = useNavigate()
    
    const total = price * 5

    // const ratings = Array(5).fill(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    return (
        <div className='flex relative justify-center w-80 mx-auto'>
        <button onClick={() => navigate(`/stays/${id}`)} className="card w-80 bg-primary shadow-xl p-0">
            <div className="card-body p-2 py-5 mx-auto">
                <p className='font-light text-start'>{available}</p>
                <h2 className="card-title text-lg text-start">
                    {location}
                </h2>
                <p className='font-light text-start'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} X 5 night</p>
                <p className='font-light text-start'>Total: Rp. {total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</p>
                    <div className="rating">
                        <Rating
                            value={value}
                            style={{ maxWidth: 180 }}
                            readOnly
                        />
                    </div> 
            </div>
        </button>
                    <button 
                    className={`btn btn-sm absolute bottom-1 right-3 ${value === 0 ? "btn-accent text-primary" : "btn-outline btn-accent"}`} 
                    onClick={handleEdit}
                    > 
                    {value === 0 ? "Give Review" : "Edit Review"}
                    </button>
                {/* {value === 0 ? (
                    <button className='btn btn-sm absolute bottom-1 right-3' onClick={handleFeedback}> Give </button>
                ): (
                    <button className='btn btn-sm absolute bottom-1 right-3'onClick={handleEdit}> Edit </button>
                )} */}
    </div>
    )
}

export default FeedBackCard