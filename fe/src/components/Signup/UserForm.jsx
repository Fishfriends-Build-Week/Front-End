import React, { useState } from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm'
import { Redirect } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';






const UserForm = props => {
  
    const [users, setUsers] = useState({
        step: 1,
        username: '',
        password: '',
        passwordError: ''
        
    });

    console.log('users from user form', users)
    

    const validate = () => {
        let isError = false;
        let errors = {
          passwordError: ''
        };
    

        if(users.password.length >= 6) {
            isError = true;
            errors.passwordError = 'Password must be at least 6 characters long';
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
        console.log('users from submit', users)
        e.preventDefault();
        axiosWithAuth()
        .post('https://fish-friends-build-week.herokuapp.com/accounts/register', users)
        .then(res => {
          // props.setIsLoggedIn(true);
          props.history.push('/profile');
        })
        .catch(err => {
          console.log('The big one that got away', err);
        });

        const err = validate();
    
        if (!err) {
          
    
          setUsers({
            username: '',
            password: ''
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
                onSubmit={onSubmit}
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
            return <Redirect to='/profile' />
    }
};

export default UserForm;