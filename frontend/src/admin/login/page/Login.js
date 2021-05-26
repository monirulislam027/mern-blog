import { Card, Grid } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../shared/components/progressBar';
import LoginForm from '../components/LoginForm';
import style from '../styles/Login.module.css';

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const loading = useMemo(() => authState.loading, [authState.loading]);
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={4}>
        <Card>
          {loading && <ProgressBar />}
          <div className={style.loginCard}>
            <h2 className='text-center'>Login To Your Account</h2>
            <LoginForm />
            <div className={style.linkWrapper}>
              <Link to='/register' className={style.link}>
                Haven't any account ? Create an account
              </Link>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;