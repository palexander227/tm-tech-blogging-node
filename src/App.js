import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import setAuthToken from './redux/auth/auth.utils';
import {loadUser} from './redux/auth/auth.actions';
import Routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header.component';
import Alert from './components/Alert/Alert.component';
import './styles.css';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <div className='App'>
          <Header />
          <Alert />
          <Routes />
        </div>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
