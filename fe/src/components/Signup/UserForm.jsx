import React, {useState, useEffect} from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm'
import { Container } from '@material-ui/core';

const UserForm = () => {

    const [users, setUsers] = useState({
        step: 1,
        email: '',
        emailError: '',
        userName: '',
        userNameError: '',
        password: ''
    });
    
    
    
    const nextStep = () => {
        const { step } = users;
        setUsers({ ...users, step: step + 1});
    };

    const prevStep = () => {
        const { step } = users;
        setUsers({ ...users, step: step - 1});
    };



    const onSubmit = e => {
        e.preventDefault();
    }

    const handleChanges = input => e => {
        setUsers({ ...users, [input]: e.target.value });
    };

    const { step } = users;
    switch (step) {
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
        )
    }
    return <div></div>;
};

export default UserForm;