import React, { useState } from 'react';
import FormUserDetails from './FormUserDetails';
import { Redirect } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';






const UserForm = props => {
  
    const [users, setUsers] = useState({
        username: '',
        password: '',
        
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
                handleChanges={handleChanges}
                values={users}
                onSubmit={onSubmit}
                />
            );
        case 2: 
            return <Redirect to='/profile' />
    }
};

export default UserForm;