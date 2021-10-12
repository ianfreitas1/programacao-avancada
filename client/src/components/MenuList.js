import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {
  Class as ClassIcon,
  Subscriptions as SubscriptionIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

const CategoryList = ({ handleDrawerClose }) => {
  const classes = useStyles();
  return (
    <>
      <List>
        <Link
          to="/my-courses"
          className={classes.link}
          onClick={handleDrawerClose}
        >
          <ListItem button className="icon">
            <ListItemIcon>
              <SubscriptionIcon />
            </ListItemIcon>
            <ListItemText>My courses</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/my-taught-courses"
          className={classes.link}
          onClick={handleDrawerClose}
        >
          <ListItem button className="icon">
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText>My taught courses</ListItemText>
          </ListItem>
        </Link>
      </List>
    </>
  );
};

export default CategoryList;
