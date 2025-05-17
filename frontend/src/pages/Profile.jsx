import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = 'http://localhost/emsystem/backend/index.php?action=';

function Profile() {

    const [user, setUser] = useState([]);

    useEffect(() => {

        const fetchUserDetails = async () => {

            const user = JSON.parse(localStorage.getItem('user'));
            const user_id = parseInt(user?.user_id)

            const response = await axios.post(`${API_URL}fetchUserDetails`, {
                user_id
            });

            setUser(response.data.user)
        }

        fetchUserDetails();
    }, [])

    return (
        <>
           {user?.user_id}
           <br />
           {user?.username}
           <br />
           {user?.role}
           <br />
           {user.created_at}
        </>
    )
}

export default Profile 