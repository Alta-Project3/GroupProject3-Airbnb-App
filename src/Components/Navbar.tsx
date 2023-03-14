import React from 'react'
import { FaChevronCircleLeft } from "react-icons/fa"
import { HiCog6Tooth } from 'react-icons/hi2'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'

interface NavbarProps {
    name?: string
    handleProfile?: React.MouseEventHandler;
    children?: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({ name, handleProfile, children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const navigate = useNavigate()

    // handle log out
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500,
                })
                removeCookie('session');
                navigate("/");
            }
        });
    }

    return (
        <div className="navbar w-screen bg-base-100 shadow-md z-10 top-0 sticky text-white border-b-2 border-primary">
            <div className="flex-1 ml-1 space-x-4">
                <a className="ml-1 text-3xl text-white">
                    <FaChevronCircleLeft />
                </a>
                <div className="flex w-60 justify-center">
                    {children}
                </div>
            </div>
            <div className="flex-none space-x-5">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                        <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaXaKH9Q7gVGHSc2_IK3mOhpEaiULsMGxwRUe2nL4b&s`} className='rounded-full w-12 h-12 sm:h-8 sm:w-8' alt="" />
                    </label>
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
