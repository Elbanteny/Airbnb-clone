import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Please Wait...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />

            {/* profile */}
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-4">Logout</button>

                    <Link to={'/'}>
                        <button className='primary max-w-sm mt-4' >
                            Back To Menu
                        </button>
                    </Link>
                </div>
            )}

            {/* places */}
            {subpage === 'places' && (
                <PlacesPage />
            )}


        </div>
    );
}

export default ProfilePage;