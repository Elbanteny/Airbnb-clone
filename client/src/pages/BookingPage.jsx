import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";
import PlaceGallery from "../PlaceGallery";

const BookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="flex my-2">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 md:p-6 p-6 my-6 rounded-2xl flex items-center md:justify-between flex-col md:flex-row">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg md:text-xl mb-4 font-semibold">YOUR BOOKING INFORMATION :</h2>
                    <BookingDates booking={booking} className="text-xs md:text-base" />
                </div>
                <div className="grid bg-primary p-3 md:p-6 text-white rounded-2xl  justify-items-center">
                    <h5 className="text-sm md:text-base">TOTAL PRICE</h5>
                    <div className="text-2xl md:text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />

            <div className="mt-8 mb-8 gap-8 bg-gray-200 rounded-2xl p-6">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        <p>{booking.place.description}</p>
                    </div>
                    <p className="py-2 text-lg">
                        Check In : {booking.place.checkIn}<br />
                        Check Out : {booking.place.checkOut}<br />
                        Max Number Of Guests : {booking.place.maxGuests}
                    </p>
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-4">
                <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
                <div className="mb-4 mt-2 text-sm leading-4 text-gray-700">{booking.place.extraInfo}</div>
            </div>


            <Link to={'/account/bookings'} >
                <button className='primary rounded-2xl mt-8'>
                    GO BACK
                </button>
            </Link>
        </div>
    );
}

export default BookingPage;