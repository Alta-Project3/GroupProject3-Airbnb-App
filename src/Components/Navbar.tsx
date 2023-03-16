import React, { useEffect } from 'react'
import { FaChevronCircleLeft } from "react-icons/fa"
import { HiCog6Tooth } from 'react-icons/hi2'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'

import axios from 'axios'

interface NavbarProps {
    name?: string
    handleProfile?: React.MouseEventHandler;
    children?: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ name, handleProfile, children }) => {


    // handle log out
    const [cookies, setCookie, removeCookie] = useCookies(['session', 'role']);
    const navigate = useNavigate()



    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            color: '#ffffff',
            background: '#0B3C95 ',
            confirmButtonColor: "#FDD231",
            cancelButtonColor: "#FE4135",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    iconColor: '#FDD231',
                    color: '#ffffff',
                    background: '#0B3C95 ',
                    showConfirmButton: false,
                    timer: 1500,
                })
                removeCookie('session');
                removeCookie('role');
                navigate("/");
            }
        });
    }


    //Handle Profile Picture
    const [loading, setLoading] = React.useState(false)
    const [img, setImg] = React.useState<any>()
    const endpoint = `https://baggioshop.site/users`

    const fetchDataUser = async () => {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.session}`
                }
            });
            setImg(response.data.data.profile_picture)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [endpoint]);

    return (
        <div className="navbar w-screen bg-base-100 shadow-md z-10 top-0 sticky text-white border-b-2 border-primary">
            <div className="flex-1 ml-1 space-x-4">
                <button onClick={() => navigate(-1)} className="ml-1 text-3xl text-white hover:text-accent">
                    <FaChevronCircleLeft />
                </button>
                <div className="flex w-60 justify-center">
                    {children}
                </div>
            </div>
            <div className="flex-none space-x-5">
                <div tabIndex={0} className="dropdown dropdown-end">
                    <div className="avatar">
                        <div className="w-8 sm:w-12 rounded-full">
                            <img src={img} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52">
                        <li onClick={() => navigate('/profile_host')}><a>
                            <HiCog6Tooth />
                            Profile
                        </a>
                        </li>
                        <li onClick={handleLogout}><a>
                            <FaSignOutAlt />
                            Sign Out
                        </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar

function removeCookie(arg0: string) {
    throw new Error('Function not implemented.')
}
