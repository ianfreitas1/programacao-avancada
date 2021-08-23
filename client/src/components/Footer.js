import React from 'react';
import Copyright from '../components/Copyright';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const Footer = () => {

    const useStyles = makeStyles((theme) => ({
        footer: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            verticalAlign: 'botton',
            bottom: 0,
        },
    }));

    const classes = useStyles();

    return (
        <Container className={classes.footer}>
            <Typography>Tutora</Typography>
            <Copyright />
        </Container>
    );
}
  
export default Footer;