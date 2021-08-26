import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login, register} from '../../redux/auth/auth.actions';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import './AuthForm.styles.scss';

const AuthForm = ({register, login, action}) => {
  let initialValues = { username: '', password: ''};
  if (action === 'Sign up') initialValues = {...initialValues, firstName: '', lastName: ''};
  const signUpValidationSchema = {
    firstName: Yup.string()
                .required("Firstname is required"),
    lastName: Yup.string()
                .required("Lastname is required")
  }
  const signUpLink = (
    <Fragment>
      Already have an account?{' '}
      <Link to='/login' name='login'>
        Log in
      </Link>
    </Fragment>
  );

  const logInLink = (
    <Fragment>
      Don't have an account?{' '}
      <Link to='/register' name='register'>
        Sign up
      </Link>
    </Fragment>
  );


  const signUpForm = (errors, touched) => {
    return (
      <Fragment>
        <div className='form-group mb-3'>
          <label htmlFor='firstName' className='pb-2 font-weight-bold' >
            Firstname
          </label>
          <Field
            className={'form-control ' + (errors.firstName && touched.firstName ? 'invalid' : '')}
            type='text'
            name='firstName'
            id='firstName'
          />
          <ErrorMessage name="firstName" className="formik-err-msg" component="div"/>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='lastName' className='pb-2 font-weight-bold' >
            Lastname
          </label>
          <Field
            className={'form-control ' + (errors.lastName && touched.lastName ? 'invalid' : '')}
            type='text'
            name='lastName'
            id='lastName'
          />
          <ErrorMessage name="lastName" className="formik-err-msg" component="div"/>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div>
        <div className='form-container'>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              if (action === 'Sign up') {
                register(values);
              } else {
                login(values);
              }
              actions.setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              ...(action === 'Sign up' && signUpValidationSchema),
              username: Yup.string()
              .required("Username is required"),
              password: Yup.string()
                .required("Password is required")
                .test('password', 'Password is not valid', (val) => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/i.test(val))
              
            })}
          >
          {({ errors, touched }) => (
            <Form className='login-form'>
              {action === 'Sign up' && signUpForm(errors, touched)}
              <div className='form-group mb-3'>
                <label htmlFor='username' className='pb-2 font-weight-bold' >
                  Username
                </label>
                <Field
                  className={'form-control ' + (errors.username && touched.username ? 'invalid' : '')}
                  type='text'
                  name='username'
                  id='username'
                />
                <ErrorMessage name="username" className="formik-err-msg" component="div"/>
              </div>
              <div className='form-group mb-3'>
              <label htmlFor='password' className='pb-2 font-weight-bold'>
                  Password
                </label>
                <Field
                  className={'form-control ' + (errors.password && touched.password ? 'invalid' : '')}
                  type='password'
                  name='password'
                  id='password'
                />
                <ErrorMessage name="password" className="formik-err-msg" component="div"/>
              </div>
              <div className='grid gs4 gsy fd-column js-auth-item '>
                <button
                  className='s-btn s-btn__primary'
                  id='submit-button'
                  name='submit-button'
                >
                  {action}
                </button>
              </div>
            </Form>
          )}
          </Formik>
          <div className='fs-caption license fc-black-500'>
            By clicking “{action}”, you agree to our{' '}
            <Link
              to='https://stackoverflow.com/legal/terms-of-service/public'
              className='-link'
            >
              terms of service
            </Link>
            ,{' '}
            <Link
              to='https://stackoverflow.com/legal/privacy-policy'
              name='privacy'
              className='-link'
            >
              privacy policy
            </Link>{' '}
            and{' '}
            <Link
              to='https://stackoverflow.com/legal/cookie-policy'
              className='-link'
            >
              cookie policy
            </Link>
            <input type='hidden' name='legalLinksShown' value='1' />
          </div>
        </div>
        <div className='redirects fc-black-500'>
          {action === 'Sign up' ? signUpLink : logInLink}
        </div>
      </div>
    </Fragment>
  );
};

AuthForm.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login, register})(AuthForm);
