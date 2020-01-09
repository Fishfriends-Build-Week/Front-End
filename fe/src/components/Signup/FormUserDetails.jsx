import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles({
    wrapper: {
        maxWidth: '40%',
        height: '50vh',
        background: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        margin: '0 auto',
        boxShadow: '8px 8px 5px #FF4C05'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
    },

    text: {
        background:'#fff',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent:'center',
        boxShadow: '5px 5px 5px #0415BF'
        
    }
})

const FormUserDetails = props => {
    console.log(props, 'this is props formuserd')
    const next = e => {
        e.preventDefault();
        props.onSubmit(e);
    }

    const classes = useStyles();

    const {
      values
      , handleChanges
    } = props;

    return (
        <div className={classes.wrapper}>
        <Container className={classes.form}>
        
            <TextField className={classes.text}
                helperText={values.usernameError}
                onChange={handleChanges('username')}
                defaultValue={values.username}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='username'
                label='User Name'
            />
            <br/>
            <TextField className={classes.text}
                onChange={handleChanges('password')}
                defaultValue={values.password}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password' 
                />
            <Button
                type='submit'
                onSubmit={props.onSubmit}
                margin='normal'
                variant='contained'
                label='Continue'
                style={styles.button}
                onClick={next}
                >Continue</Button>
        </Container>
        </div>
    )
}

const styles = {
    button: {
        margin: '25px auto 0',
        width: '40%'
    }
}

export default FormUserDetails;