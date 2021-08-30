import React, {Fragment, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/auth/auth.actions';
import {getPosts} from '../../redux/posts/posts.actions';
import Spinner from '../Spinner/Spinner.component';
import LinkButton from '../LinkButton/LinkButton.component';
import { Dropdown  } from 'react-bootstrap';

import './Header.styles.scss';

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {

  const [search, setSearch] = useState('');
  let history = useHistory();

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div 
      data-letters={(user.firstName.charAt(0)+user.lastName.charAt(0)).toUpperCase()}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
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
                <div data-letters={(user.firstName.charAt(0)+user.lastName.charAt(0)).toUpperCase()}>
                  {user.username}
                </div>
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

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
          onSubmit={() => history.push({pathname: '/', search: `search=${search}`})}
          className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
          autoComplete='off'
        >
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" onChange={handleChange} />
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
