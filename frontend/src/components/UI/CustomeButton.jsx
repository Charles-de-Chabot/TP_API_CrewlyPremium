import React from 'react';
import ButtonLoader from '../Loader/ButtonLoader';

const CustomeButton = ({ 
    children, 
    isLoading = false, 
    type = "button", 
    onClick, 
    className = "" 
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={`
                relative w-full py-3.5 px-6 
                bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 
                text-white font-bold text-sm tracking-wide uppercase
                rounded-xl shadow-lg shadow-emerald-900/40 
                transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                ${className}
            `}
        >
            {isLoading ? <div className="flex justify-center"><ButtonLoader /></div> : children}
        </button>
    );
};

export default CustomeButton;