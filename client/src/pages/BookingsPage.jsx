import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import PlacesImg from "../PlacesImg";
import AccountNav from "./AccountNav";

const BookingsPage = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.log('Terjadi kesalahan saat mengakses endpoint /bookings:', error);
            });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-5">
                        <div className="w-full flex-row md:flex hidden">
                            <PlacesImg place={booking.place} />
                        </div>
                        <div className="py-3 md:pr-3 md:pl-2 px-3 grow mx-auto">
                            <PlacesImg place={booking.place} className="overflow-hidden rounded-2xl mb-3 -ml-2 md:hidden" />
                            <h1 className="font-semibold text-lg w-3/2 md:w-full md:text-xl">{booking.place.title}</h1>
                            <h6 className="text-sm w-3/2 my-2 md:w-full">{booking.place.address}</h6>
                            <div className="text-sm w-1/2 md:w-full md:text-xl">
                                <BookingDates booking={booking} className="mb-2 mt-2 text-gray-500 text-xs md:text-lg" />
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 pt-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span className="text-sm pt-1 font-bold md:text-xl">
                                        Total price: ${booking.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="text-center mt-4">
                    <Link to={'/'}>
                        <button className='inline-flex gap-1 bg-primary text-white py-2 px-4 my-2 rounded-full' >
                            Back To Menu
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookingsPage;




