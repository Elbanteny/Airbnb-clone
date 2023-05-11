import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data])
        })
    }, []);

    return (
        <div>
            <div className="mt-4">
                <input type="text" placeholder="Search" className="block md:hidden" />
            </div>
            <div className="mt-8 gap-y-8 gap-x-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {places.length > 0 && places.map(place => (
                    <Link to={'/place/' + place._id} key={place}>
                        <div className="mb-2 bg-gray-500 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h1 className="font-bold truncate">{place.title}</h1>
                        <h3 className="text-sm text-gray-500">{place.address}</h3>
                        <div className="mt-1">
                            <span className="font-bold text-lg">${place.price}</span> Per Night
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Index;