import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import moduleName from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        padding: '3px 2px',
    },
});

const Confirm = props => {
    const classes = useStyles();
    const next = e => {
        e.preventDefault();
        props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }
    const { values } = props;
    return (
        <Paper className={classes.root}>
            <Typography variant='h5' component='h2'>
                {values.email}
            </Typography>
            <Typography variant='h5' component='h2'>
                {values.userName}    
            </Typography>
            <Typography variant='h5' component='h2'>
                {values.password}    
            </Typography>
            <br/>
            <Button
                margin='normal'
                halfWidth
                variant='contained'
                label='Continue'
                style={styles.button}
                onClick={next}>
                    Confirm & Continue        
            </Button>
            <Button
                margin='normal'
                halfWidth
                variant='contained'
                label='Back'
                style={styles.button}
                onClick={back}>
                Go Back
            </Button>    
        </Paper>
    )
}

const styles = {
    button: {
        margin: 15
    }
}

export default Confirm;