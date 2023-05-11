import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesImg from "../PlacesImg";
import AccountNav from "./AccountNav";

const PlacesPage = () => {

    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>

            </div>

            <div className="mt-4 mb-2">
                {places.length > 0 && places.map(place => (
                    <Link key={place} to={'/account/places/' + place._id} className="cursor-pointer flex gap-4 bg-gray-100 p-4 my-3 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            <PlacesImg place={place} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title} </h2>
                            <p className="">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center">
                <Link to={'/'}>
                    <button className='inline-flex gap-1 bg-primary text-white py-2 px-4 my-2 rounded-full' >
                        Back To Menu
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default PlacesPage;