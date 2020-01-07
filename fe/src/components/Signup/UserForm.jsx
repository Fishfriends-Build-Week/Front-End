import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm'
import { Redirect } from 'react-router-dom';
import axios from 'axios';




const UserForm = () => {
    

    const [users, setUsers] = useState({
        step: 1,
        userName: '',
        password: '',
        cPassword: '',
        cPasswordError: ''
    });

    
    // useEffect(() => {
    //     axios
    //     .get('https://fish-friends-build-week.herokuapp.com/')
    //     .then(res => {
    //         console.log(res.data)
    //         setUsers(res.data)
    //     })
    // })

    

    const validate = () => {
        let isError = false;
        let errors = {
          cPasswordError: ''
        };
    

        if(users.cPassword !== users.password) {
            isError = true;
            errors.cPasswordError = 'Please make sure passwords match'
        }
    
        if (isError) {
          setUsers({
            ...users,
            ...errors
          });
        }
    
        return isError;
      };
    
      const onSubmit = e => {
        e.preventDefault();
        console.log("register form data:", users);
        
    
        const err = validate();
    
        if (!err) {
          
    
          setUsers({
            userName: '',
            password: '',
            cPassword: '',
            cPasswordError: ''
          });
        } 
      };
    
    
    const nextStep = () => {
        const { step } = users;
        setUsers({ ...users, step: step + 1});
    };

    const prevStep = () => {
        const { step } = users;
        setUsers({ ...users, step: step - 1});
    };

    const handleChanges = input => e => {
        setUsers({ ...users, [input]: e.target.value });
        console.log('Changes to user state', users)
    };

    const { step } = users;
    switch (step) {
        default:
        case 1:
            return(
                <FormUserDetails
                nextStep={nextStep}
                handleChanges={handleChanges}
                values={users}
                />
            );

        case 2: 
            return(
                <Confirm
                nextStep={nextStep}
                prevStep={prevStep}
                onSubmit={onSubmit}
                values={users}
                />
            );
        case 3: 
            return <Redirect to='/Profile' />
    }
};

export default UserForm;