import React from 'react';
import { Drawer, Divider } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuList from './MenuList';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1),
    },
    zIndex: 99,
  },
  closeButton: {
    cursor: 'pointer',
  },
}));

const DrawerMenu = ({ drawerOpen, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={drawerOpen}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div>
            <CloseIcon
              className={classes.closeButton}
              onClick={handleDrawerClose}
            />
          </div>
          <Divider />
          <MenuList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerMenu;
