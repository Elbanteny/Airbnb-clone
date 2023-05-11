import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const MobileNav = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Periksa apakah scroll telah mencapai atau melampaui batas tertentu
            if (scrollPosition > documentHeight - windowHeight - 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Konten utama */}
            <div className={isVisible ? 'hidden ease-in-out duration-300 transition' : 'opacity-100 ease-in-out duration-300 transition'}>
                <div className="fixed bottom-0 right-0 left-0 p-3
                        bg-gray-200 flex flex-row items-center justify-center gap-10 border border-t-gray-300 rounded-t-3xl shadow-innerz md:hidden">

                    <Link to={'/'}>
                        <div className="flex items-center justify-center flex-col max-w-full">
                            <button className='bg-primary text-white p-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>

                            <div className="font-semibold text-sm">Search</div>


                        </div>
                    </Link>

                    <div className="flex flex-col items-center justify-center">
                        <Link to={user ? '/account' : '/login'} className=' border border-gray-400 rounded-full py-[4.5px] px-[4.5px]'>
                            <div className=" bg-gray-500 text-white border-gray-500 rounded-full ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 relative top-1">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>

                        </Link>
                        {user ? (
                            <div className='text-sm font-semibold'>
                                {user.name}
                            </div>
                        ) : (
                            <div>
                                Login
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default MobileNav;