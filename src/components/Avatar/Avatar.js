import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import rockAvatar from './rockHand.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'flex-end'
    
  },
}));

const ImageAvatar = ({user}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="rock avatar" src={rockAvatar}></Avatar>
    </div>
  );
}

export default ImageAvatar;

// {user.username.split(' ')[0][0]} {user.username.split(' ')[1][0]}