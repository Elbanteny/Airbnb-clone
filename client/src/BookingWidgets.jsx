import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom"
import axios from "axios";
import { UserContext } from "./UserContext";

const BookingWidgets = ({ place }) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState(1)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [redirect, setRedirect] = useState('')
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async () => {
        const response = await axios.post('/bookings', {
            checkIn, checkOut,
            name, phoneNumber,
            place: place._id,
            price: numberOfNights * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow rounded-2xl p-5">
            <div className="text-2xl text-center p-1">
                PRICE: <span className="font-bold">${place.price}</span> /Per Night
            </div>

            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="px-4 py-3 text-xs md:text-base">
                        <label htmlFor="">Check In : </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="px-4 py-3 border-l text-xs md:text-base">
                        <label htmlFor="">Check Out : </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="px-4 py-3 border-t">
                    <label htmlFor="">Number Of Guest :</label>
                    <input type="number" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)} />
                </div>
            </div>

            {numberOfNights > 0 && (
                <div className="px-4 py-3 border-t">
                    <label htmlFor="">Full Name :</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label htmlFor="">Phone Number :</label>
                    <input type="text" value={phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} />
                </div>
            )}

            <button onClick={bookThisPlace} className="primary mt-4">
                BOOK THIS PLACE
                {checkIn && checkOut > 0 && (
                    <span>${numberOfNights * place.price}</span>
                )}
            </button>
        </div>

    );
}

export default BookingWidgets;