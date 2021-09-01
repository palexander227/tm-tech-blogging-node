import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withPageTitle from './services/withPageTitle';

import PageContainer from './components/PageContainer/PageContainer.component';
import HomePage from './pages/HomePage/HomePage.component';
import Register from './pages/Register/Register.component';
import Login from './pages/Login/Login.component';
import Post from './pages/Post/Post.component';
import PostForm from './pages/PostForm/PostForm.component';
import UserPage from './pages/UserPage/UserPage.component';
import NotFound from './pages/NotFound/NotFound.component';
import PrivateRoute from './components/PrivateRoute';

const HomePageComponent = withPageTitle({
  component: PageContainer({component: HomePage}),
  title:
    'Tech Blog - Where Developers Learn, Share, & Build Careers',
});

const RegisterComponent = withPageTitle({
  component: Register,
  title: 'Sign Up - Tech Blog',
});

const LoginComponent = withPageTitle({
  component: Login,
  title: 'Log In - Tech Blog',
});

const PostFormComponent = withPageTitle({
  component: PostForm,
  title: 'New Blog - Tech Blog',
});

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
});

const PostComponent = PageContainer({component: Post});
const UserPageComponent = PageContainer({component: UserPage});

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePageComponent} />
      <Route exact path='/register' component={RegisterComponent} />
      <Route exact path='/login' component={LoginComponent} />
      <Route exact path='/post/:id' component={PostComponent} />
      <PrivateRoute exact path='/users/:id' component={UserPageComponent} />
      <PrivateRoute exact path='/add/post' component={PostFormComponent} />
      <PrivateRoute exact path='/add/post/:id' component={PostFormComponent} />
      <PrivateRoute exact path='/dashboard' component={HomePageComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
};

export default Routes;
