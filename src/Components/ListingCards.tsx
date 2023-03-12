import React from 'react';
import { AiFillStar } from 'react-icons/ai';

interface ListingProps {
    location: string;
    rating: number;
    available: string;
    price: number;
    image: string;
}


const ListingCards: React.FC<ListingProps> = ({ location, rating, available, price, image }) => {
    return (
        <div className="card w-10/12 bg-primary shadow-xl p-0">
            <figure><img src={image} alt="image not found" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {location}
                    <div className="badge badge-accent"><AiFillStar />{rating}</div>
                </h2>
                <p className='font-light'>{available}</p>
                <p className='font-light'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / night</p>
            </div>
        </div>
    )
}

export default ListingCards