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
    edit?: boolean
    toDelete?: boolean
    handleEdit?: React.MouseEventHandler
    handleDelete?: React.MouseEventHandler
}


const ListingCards: React.FC<ListingProps> = ({ 
    id, 
    location, 
    rating, 
    available, 
    price, 
    image, 
    edit, 
    handleDelete, 
    handleEdit, 
    toDelete
}) => {
    
    const navigate = useNavigate()

    return (
        <div className='flex relative justify-center'>
        <button onClick={() => navigate(`/stays/${id}`)} className="card w-10/12 bg-primary shadow-xl p-0">
            <figure>
                <img src={image} alt="image not found" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {location}
                    <div className="badge badge-accent"><AiFillStar />{rating}</div>
                </h2>
                <p className='font-light'>{available}</p>
                <p className='font-light'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / night</p>
            </div>
        </button>
            <p className={`text-accent font-semibold ${edit? "absolute bottom-0 right-10" : "hidden"}`} onClick={handleEdit}>
                edit
            </p>
            <button className={`btn btn-xs btn-warning w-6 rounded-full ${toDelete ? "absolute top-0 right-8" : "hidden"}`}
            onClick={handleDelete}
            >
                -
            </button>
        </div>
    )
}

export default ListingCards