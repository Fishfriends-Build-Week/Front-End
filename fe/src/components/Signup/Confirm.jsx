import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        display:'flex',
        width: '50%',
        flexDirection: 'column',
        height: '50vh',
        background:'#00FFFF',
        padding: '3px 2px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
    },

    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Confirm = props => {
    const classes = useStyles();
    const next = e => {
        e.preventDefault();
        props.nextStep();
        props.onSubmit(e);
    };

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };
    const { values } = props;
    return (
        <Paper className={classes.root}>
            <Typography className={classes.text} variant='h5' component='h2'>
                {values.email}
            </Typography>
            <Typography className={classes.text} variant='h5' component='h2'>
                {values.username}
            </Typography>
            <Typography className={classes.text} variant='h5' component='h2'>
                {values.password}
            </Typography>
            <br/>
            <Button
                margin='normal'
                width='50%'
                variant='contained'
                label='Continue'
                style={styles.button}
                onClick={next}>
                    Confirm & Continue
            </Button>
            <Button
                margin='normal'
                width='50%'
                variant='contained'
                label='Back'
                style={styles.button}
                onClick={back}>
                Go Back
            </Button>
        </Paper>
    )
};

const styles = {
    button: {
        margin: 15
    }
};

export default Confirm;