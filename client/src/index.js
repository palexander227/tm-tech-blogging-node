import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import axios from 'axios';

// For GET requests
axios.interceptors.request.use(
  (req) => {
    if (!req.url?.includes('user/login') && !req.url?.includes('user/register')) {
      const token = localStorage.getItem("token");
      const tokenValue = token?.replace(/^"(.*)"$/, "$1");
      req.headers['Authorization'] = 'Bearer ' + tokenValue;
      req.headers['Cache-Control'] = 'no-cache';
      req.headers['Content-Type'] = 'application/json';
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 201) {
    }
    return res;
  },
  (err) => {
    if (err.response.status === 401 || err.response.data.message === '401 Unauthorized') {
      //return <Redirect to='/login' />
    }
    return Promise.reject(err);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
