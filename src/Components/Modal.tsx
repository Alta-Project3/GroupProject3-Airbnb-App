import React, { useState } from "react";

import {HiOutlineXMark} from 'react-icons/hi2'

type ModalProps = {
    isOpen: boolean;
    isClose: React.MouseEventHandler;
    title: string;
    children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, isClose, title, children }) => {
    return (
        <div
        className={`${
            isOpen ? "fixed" : "hidden"
        } inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50`}
        >
        <div className="bg-primary w-full h-full rounded-lg p-6">
            <a onClick={isClose} className="text-white text-4xl hover:text-black"> 
                <HiOutlineXMark/>
            </a>
            <div className="flex justify-center items-center mb-4">
            <h1 className="text-2xl text-alta-space-cadet font-semibold">
                {title}
            </h1>
            </div>
            <div>{children}</div>
        </div>
        </div>
    );
};

export default Modal;