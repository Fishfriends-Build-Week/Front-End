import React, { useState, useEffect } from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm'
import { Redirect } from 'react-router-dom';
import axios from 'axios';




const UserForm = () => {
    

    const [users, setUsers] = useState({
        step: 1,
        email: '',
        emailError: '',
        userName: '',
        userNameError: '',
        password: ''
    });
    
    useEffect(() => {
        axios
        .get('https://fish-friends-build-week.herokuapp.com/')
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
        })
    })

    

    const validate = () => {
        let isError = false;
        const errors = {
          userNameError: ""
        };
    
        if (users.userName.length < 5) {
          isError = true;
          errors.userNameError = "Username need to be at least 5 characters long";
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
            userName: "",
            userNameError: "",
            password: "",
          });
          handleChanges({
            userName: "",
            password: ""
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
    };

    const { step } = users;
    switch (step) {
        default:
        case 1:
            return(
                <FormUserDetails
                nextStep={nextStep}
                handleChanges={handleChanges}
                onSubmit={onSubmit}
                values={users}
                />
            );

        case 2: 
            return(
                <Confirm
                nextStep={nextStep}
                prevStep={prevStep}
                values={users}
                />
            );
        case 3: 
            return <Redirect to='/Profile' />
    }
};

export default UserForm;