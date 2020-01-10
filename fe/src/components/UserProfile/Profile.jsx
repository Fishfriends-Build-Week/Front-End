import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        padding: 45,
        margin: '25px auto',
        width: '80%',
        maxWidth: 550
    },
    divider: {
        width: '100%',
        margin: '0 auto',
        marginBottom: 25
    },
    baitTitle: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: '5px',
        marginBottom: 25
    },
    bait: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: '5px',
        marginBottom: 25
    },
    name: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 30,
        textAlign: 'center'
    },
    info: {
        fontSize: 16
    },
    header: {
        fontSize: 25,
        marginBottom: 10
    },
    sectionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25
    },
    leftSection: {
        textAlign: 'left',
        width: '48%',
    },
    rightSection: {
        textAlign: 'right',
        width: '48%'
    }
}));

const Profile = () => {
    // const { username } = useSelector(state => state.reducer.userData);
    const [user, setUser] = useState({
        username: '',
        
    });

    useEffect(() => {
    //     axiosWithAuth()
    //     .get(`https://fish-friends-build-week.herokuapp.com/accounts/${username}`)
    //     .then(res => {
    //         console.log(res);
    //         setUser(res.data);
    //     })
    //     .catch(err => console.log('use: ', err));
        let u = localStorage.getItem("username");
        console.log(`TCL: Profile -> username`, u);

        setUser({username: u});
    },[]);

    const classes = useStyles();
    return(
        <Paper className={classes.root}>
            <Typography className={classes.name} variant='h5' component='h3'>
                {user.username}
             </Typography>
        {/* <Divider className={classes.divider} />
            <Typography className={classes.bait} variant='h5' component='h3'>
                <span className={classes.baitTitle}>Favorite Bait:</span> ${user.favBait}
            </Typography>
            <Divider className={classes.divider} />
            <section className={classes.sectionRow}>
                <div className={classes.leftSection}>
                    <Typography className={classes.header} variant='h5' component='h3'>
                        Tagline
                    </Typography>
                    <Typography
                    className={classes.info}
                    color='textSecondary'
                    component='p'
                    >
                        {user.tagLine}
                    </Typography>
                </div>
                <div className={classes.rightSection}>
                    <Typography className={classes.header} variant='h5' component='h3'>
                        Biggest Fish Caught
                    </Typography>
                    <Typography
                    className={classes.info}
                    color='textSecondary'
                    component='p'>
                        {user.topFish}    
                    </Typography>    
                </div> 
            </section> */}
        </Paper>
    ); 
};

export default Profile;