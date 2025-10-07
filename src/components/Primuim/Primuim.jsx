import React from 'react';
import { Button } from '@mui/material'; // Ensure you have Material-UI installed
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    textAlign: 'center',
    backgroundColor: '#f5f5f5', // Light background
  },
  message: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333', // Darker text color
  },
  button: {
    backgroundColor: '#1976d2', // Primary color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1565c0', // Darker shade on hover
    },
  },
}));

const Primuim = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.message}>
        You need to Primuim to access 
      </div>
      <Button variant="contained" className={classes.button} LinkComponent={Link} to="/watch-videos">
        Home
      </Button>
    </div>
  );
};

export default Primuim;
