import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingWidgets from "../BookingWidgets";
import PlaceGallery from "../PlaceGallery";

const PlaceDetailPage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);


    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data)
            })
        }
    }, [id]);

    if (!place) return '';



    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 border-t">
            <h1 className="text-2xl md:text-3xl ">{place.title}</h1>
            <AddressLink >{place.address}</AddressLink>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        <p>{place.description}</p>
                    </div>
                    <p className="py-2 text-lg">
                        Check In : {place.checkIn}<br />
                        Check Out : {place.checkOut}<br />
                        Max Number Of Guests : {place.maxGuests}
                    </p>
                </div>
                <BookingWidgets place={place} />
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
                <div className="mb-4 mt-2 text-sm leading-4 text-gray-700">{place.extraInfo}</div>
            </div>
        </div>

    );
}

export default PlaceDetailPage;