import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router';

interface ListingProps {
    id: number;
    location: string;
    rating: number;
    available: string;
    price: number;
    image: string;
}


const ListingCards: React.FC<ListingProps> = ({ id, location, rating, available, price, image }) => {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(`/stays/${id}`)} className="card w-10/12 bg-primary shadow-xl p-0">
            <figure><img src={image} alt="image not found" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {location}
                    <div className="badge badge-accent"><AiFillStar />{rating}</div>
                </h2>
                <p className='font-light'>{available}</p>
                <p className='font-light'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / night</p>
            </div>
        </button>
    )
}

export default ListingCards