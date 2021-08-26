import React from 'react';
import {NavLink} from 'react-router-dom';

import {ReactComponent as GlobalIcon} from '../../assets/Globe.svg';
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
        <p>Home</p>
      </NavLink>

      <NavLink
        exact
        activeClassName='active'
        className='home-link nav_link'
        to='/'
      >
        <p>Dashboard</p>
      </NavLink>
    </div>
  </div>
);

export default SideBar;
