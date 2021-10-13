import React, { useState } from 'react';
import { useHistory } from 'react-router';
import DrawerMenu from './Drawer';
import TitleBar from './TitleBar';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const history = useHistory();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <>
      <TitleBar handleDrawerToggle={handleDrawerToggle} signOut={signOut} />
      <DrawerMenu
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default Header;
