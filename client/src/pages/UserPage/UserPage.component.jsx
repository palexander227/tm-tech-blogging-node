import React, {useEffect, Fragment, useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser, updateUser, deleteUser} from '../../redux/users/users.actions';
import {Link} from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner.component';
import './UserPage.styles.scss';

const UserPage = ({getUser, updateUser, deleteUser, user: {user, loading}, match}) => {
  const [isUpdate, setUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues = { firstName: user?.firstName, lastName: user?.lastName, username: user?.username};
  const validationSchema= Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is required"),
      lastName: Yup.string()
        .required("Last Name is required")
    
  })

  useEffect(() => {
    getUser(match.params.id);
    // eslint-disable-next-line
  }, [getUser]);

  return loading || user === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <PageTitle title={`User ${user.username} - CLONE Stack Overflow`} />
      <div id='mainbar' className='user-main-bar pl24 pt24'>
        <div className='user-card'>
          <div className='grid'>
            <div className='img-card'>
              <div className='avatar-card'>
                <div className='avatar'>
                  <Link className='avatar-link' to={`/users/${user.id}`}>
                    <div className='logo-wrapper'>
                    <p data-letters={(user.firstName.charAt(1)+user.lastName.charAt(1)).toUpperCase()} className="profile-img">
                    </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className='content-card py-4'>
              <div className='content-grid'>
                <div className='info-cell'>
                  <div className='info'>
                    <div className='details'>
                      <h2>{user.username}</h2>
                    </div>
                    <div className='date'>
                      <p>
                        user created &nbsp;-&nbsp;
                        {moment(user.created_at).fromNow(false)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='stats-cell'>
                  <div className='count-sec'>
                    <div className='counts'>
                      <div className='cells'>
                        <div className='column-grid'>
                          <div className='head fc-black-700'>
                            {user.answer_count}
                          </div>
                          <button className='btn btn-primary foot fc-black-500' onClick={()=>setUpdate(true)} disabled={isUpdate}>upodate</button>
                        </div>
                      </div>
                      <div className='cells'>
                        <div className='column-grid'>
                          <div className='head fc-black-700'>
                            {user.post_count}
                          </div>
                          <button className='btn btn-danger foot fc-black-500' onClick={handleShow}>delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row-grid'>
          <div className='grid-cell1'>
          </div>
          <div className='grid-cell2'>
            <div className='top-tags'>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  updateUser(values);
                  setUpdate(false);
                  actions.setSubmitting(false);
                }}
                validationSchema={validationSchema}
              >
              {({ errors, touched }) => (
                <Form className='login-form'>
                  <div className='form-group mb-3'>
                    <label htmlFor='username' className='pb-2 font-weight-bold' >
                      Username
                    </label>
                    <Field
                      className={'form-control'}
                      type='text'
                      name='username'
                      id='username'
                      disabled={true}
                    />
                  </div>
                  <div className='form-group mb-3'>
                  <label htmlFor='firstName' className='pb-2 font-weight-bold'>
                      Firstname
                    </label>
                    <Field
                      className={'form-control ' + (errors.firstName && touched.firstName ? 'invalid' : '')}
                      type='text'
                      name='firstName'
                      id='firstName'
                      disabled={!isUpdate}
                    />
                    <ErrorMessage name="firstName" className="formik-err-msg" component="div"/>
                  </div>
                  <div className='form-group mb-3'>
                  <label htmlFor='lastName' className='pb-2 font-weight-bold'>
                      Lastname
                    </label>
                    <Field
                      className={'form-control ' + (errors.lastName && touched.lastName ? 'invalid' : '')}
                      type='text'
                      name='lastName'
                      id='lastName'
                      disabled={!isUpdate}
                    />
                    <ErrorMessage name="lastName" className="formik-err-msg" component="div"/>
                  </div>
                  {isUpdate &&
                    <div className="d-flex">
                      <div className='grid gs4 gsy fd-column js-auth-item '>
                        <button
                          className='btn btn-primary'
                          id='submit-button'
                          name='submit-button'
                          type='submit'
                        >
                          Update
                        </button>
                      </div>
                      <div className='grid gs4 gsy fd-column js-auth-item '>
                        <button
                          className='btn btn-danger'
                          id='cancel-button'
                          name='cancel-button'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  }
                </Form>
              )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete your account</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=> { deleteUser(); handleClose();}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {getUser, updateUser, deleteUser})(UserPage);
