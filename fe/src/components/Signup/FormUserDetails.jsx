import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



const FormUserDetails = props => {
    const next = e => {
        e.preventDefault();
        props.nextStep();
        props.onSubmit(e);
    }

    const {values, handleChanges, handleChecked} = props;

    return (
        <Container>
            <TextField
                helperText={values.email}
                onChange={handleChanges('email')}
                defaultValue={values.email}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='email'
                label='Email'
            />
            <TextField
                helperText={values.userNameError}
                onChange={handleChanges('userName')}
                defaultValue={values.userName}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='userName'
                label='User Name'
            />
            <br/>
            <TextField
                onChange={handleChanges('password')}
                defaultValue={values.password}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='password'
                type='password'
                id='password'
                autoComplete='current-password' 
                />
                <Button
                    type='submit'
                    onSubmit={props.onSubmit}
                    margin='normal'
                    halfWidth
                    variant='contained'
                    label='Continue'
                    style={styles.button}
                    onClick={next}
                >Continue
                </Button>
                </Container>
    )
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails;