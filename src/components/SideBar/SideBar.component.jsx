import React from 'react';
import {NavLink} from 'react-router-dom';
import './SideBar.styles.scss';

const SideBar = () => (
  <div className='side-bar-container'>
    <div className='side-bar-tabs'>
      <NavLink
        exact
        activeClassName='active'
        className='home-link nav_link'
        to='/'
      >
        <div>Home</div>
      </NavLink>

      <NavLink
        exact
        activeClassName='active'
        className='home-link nav_link'
        to='/dashboard'
      >
        <div>Dashboard</div>
      </NavLink>
    </div>
  </div>
);

export default SideBar;
