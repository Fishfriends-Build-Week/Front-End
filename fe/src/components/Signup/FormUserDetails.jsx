import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        maxWidth: '40%',
        height: '50vh',
        background: '#00FFFF',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        margin: '0 auto',
        boxShadow: '6px 8px 5px #000'
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
        boxShadow: '5px 5px 5px #000'
        
    }
})

const FormUserDetails = props => {
    console.log(props, 'this is props formuserd')
    const next = e => {
        e.preventDefault();
        props.nextStep();
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
            <TextField className={classes.text}
                onChange={handleChanges('cPassword')}
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
            <TextField className={classes.text}
                onChange={handleChanges('password')}
                defaultValue={values.cPassword}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='cPassword'
                label='Confirm Password'
                type='password'
                id='cPassword'
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