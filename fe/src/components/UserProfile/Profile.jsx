import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import {axiosWithAuth } from '../../utils/axiosWithAuth';

const Profile = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({

    });

    useEffect(() => {
        axiosWithAuth()
        .get('https://fish-friends-build-week.herokuapp.com/')
        .then(res => {
            console.log(res.data);
        });
        
    })
    
}

export default Profile;