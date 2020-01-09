import React, { useState, useEffect } from 'react';
// import {axiosWithAuth } from '../../utils/axiosWithAuth';

const Profile = () => {
    const [user, setUser] = useState({
        username: ''
    });

    useEffect(() => {
        // axiosWithAuth()
        // .get(`https://fish-friends-build-week.herokuapp.com/accounts`)
        // .then(res => {
        //     console.log(res);
        //     setUser(res.data);
        // })
        // .catch(err => console.log('use: ', err));
        let u = localStorage.getItem("username");
        console.log(`TCL: Profile -> username`, u);

        setUser({username: u});
    },[]);

    return(
    <h1>Welcome {user.username}</h1>
    )
    
}

export default Profile;