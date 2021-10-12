import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
  Menu as MenuIcon,
  AccountBalanceWallet as LogoutIcon,
} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: 999,
  },
  menuButton: {
    cursor: 'pointer',
  },
  rightIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  imgIcon: {
    width: 30,
    height: 30,
    borderRadius: '100%',
  },
  selected: {
    background: '#e9e9ef',
  },
}));

const ITEM_HEIGHT = 60;

const TitleBar = ({ handleDrawerToggle, signOut }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = event => {
    event.preventDefault();
    signOut();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <MenuIcon className={classes.menuButton} onClick={handleDrawerToggle} />
        <RouterLink
          style={{ color: 'white', textDecoration: 'none' }}
          to="/dashboard"
        >
          <Box flexGrow={1} fontSize="h6.fontSize">
            Tutora
          </Box>
        </RouterLink>

        <Box mr={0} ml="auto">
          <Grid container>
            <IconButton
              color="inherit"
              aria-label="More"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              <Divider />

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TitleBar);
