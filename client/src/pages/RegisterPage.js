import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as MaterialLink } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from '../api/authApi';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) history.push('/dashboard');
  }, []);

  const handleSignUp = async e => {
    e.preventDefault();
    const body = {
      name,
      email,
      password,
      major,
      age,
    };

    try {
      const { user, token } = await registerUser(body);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      setError(null);
      history.push('/dashboard');
    } catch (error) {
      if (!error) setError('Failed to sign up. Please try again in a moment.');
      else setError(error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="major"
                  label="Major"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography className={classes.error}>{error}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink component={Link} to="/login">
                  Already have an account? Sign in
                </MaterialLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RegisterPage;
