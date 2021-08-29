import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/auth/auth.actions';
import {ReactComponent as Search} from '../../assets/Search.svg';
import Spinner from '../Spinner/Spinner.component';
import LinkButton from '../LinkButton/LinkButton.component';
import { Dropdown  } from 'react-bootstrap';

import './Header.styles.scss';

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {
  let history = useHistory();
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p 
      data-letters={(user.firstName.charAt(1)+user.lastName.charAt(1)).toUpperCase()}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
  ));
  const authLinks = (
    <div className='btns'>
      {loading || user === null ? (
        <Spinner width='50px' height='50px' />
      ) : (
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <p data-letters={(user.firstName.charAt(1)+user.lastName.charAt(1)).toUpperCase()}>
                  {user.username}
                </p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href={"/add/post"}>Create Post</Dropdown.Item>
              <Dropdown.Item href={"/users/"+user.id}>My Profile</Dropdown.Item>
              <Dropdown.Item href="javascript:void(0)" onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      )}
    </div>
  );

  const guestLinks = (
    <div className='btns'>
      <LinkButton text={'Log in'} link={'/login'} type={'s-btn__primary'} />
      <LinkButton text={'Sign up'} link={'/register'} type={'s-btn__filled'} />
    </div>
  );

  return loading ? (
    ''
  ) : (
    <Fragment>
      <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
        <Link className='navbar-brand' to='/'>
          <img src="/blog.svg" alt="" width="200px" />
        </Link>
        <form
          id='search'
          onSubmit={() => history.push('/questions')}
          className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
          autoComplete='off'
        >
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </form>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Header);
