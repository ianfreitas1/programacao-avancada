import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Tutora</Typography>
        <Button color="inherit" onClick={() => console.log('login')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
