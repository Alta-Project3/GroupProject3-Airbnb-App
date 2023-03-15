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
        <div className='flex relative justify-center w-80 mx-auto'>
            <button onClick={() => navigate(`/stays/${id}`)} className="card w-80 bg-primary shadow-xl p-0">
                <figure>
                    <img src={image} alt="image not found" />
                </figure>
                <div className="card-body p-0 py-5 mx-auto">
                    <h2 className="card-title justify-between">
                        {location}
                        <div className="badge badge-accent"><AiFillStar />{rating}</div>
                    </h2>
                    <p className='font-light text-start'>{available}</p>
                    <p className='font-light text-start'>Rp. {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} / night</p>
                </div>
            </button>

            <div className={`flex font-semibold space-x-5 ${edit ? "absolute bottom-1 right-3" : "hidden"}`}>
                <p className='text-accent' onClick={handleEdit}>
                    edit
                </p>
                <p className='text-warning' onClick={handleDelete}>
                    delete
                </p>
            </div>
        </div>
    )
}

export default ListingCards