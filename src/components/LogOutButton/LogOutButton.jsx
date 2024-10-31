import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button color='#fafafa' sx={{textDecoration: 'none', '&.MuiButton-root:hover':{bgcolor: 'transparent'}}}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <Typography textTransform='none'>
      Log Out
      </Typography>
    </Button>
  );
}

export default LogOutButton;
