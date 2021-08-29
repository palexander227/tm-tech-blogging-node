import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withPageTitle from './services/withPageTitle';

import PageContainer from './components/PageContainer/PageContainer.component';
import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import TagsPage from './pages/TagsPage/TagsPage.component';
import UsersPage from './pages/UsersPage/UsersPage.component';
import Register from './pages/Register/Register.component';
import Login from './pages/Login/Login.component';
import Post from './pages/Post/Post.component';
import PostForm from './pages/PostForm/PostForm.component';
import TagPage from './pages/TagPage/TagPage.component';
import UserPage from './pages/UserPage/UserPage.component';
import NotFound from './pages/NotFound/NotFound.component';

const HomePageComponent = withPageTitle({
  component: PageContainer({component: HomePage}),
  title:
    'Tech Blog - Where Developers Learn, Share, & Build Careers',
});

const QuestionsPageComponent = withPageTitle({
  component: PageContainer({component: QuestionsPage}),
  title: 'All Questions - Tech Blog',
});

const TagsPageComponent = withPageTitle({
  component: PageContainer({component: TagsPage}),
  title: 'Tags - Tech Blog',
});

const UsersPageComponent = withPageTitle({
  component: PageContainer({component: UsersPage}),
  title: 'Users - Tech Blog',
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
const TagPageComponent = PageContainer({component: TagPage});

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePageComponent} />
      <Route exact path='/post' component={QuestionsPageComponent} />
      <Route exact path='/tags' component={TagsPageComponent} />
      <Route exact path='/users' component={UsersPageComponent} />
      <Route exact path='/register' component={RegisterComponent} />
      <Route exact path='/login' component={LoginComponent} />
      <Route exact path='/post/:id' component={PostComponent} />
      <Route exact path='/users/:id' component={UserPageComponent} />
      <Route exact path='/tags/:tagname' component={TagPageComponent} />
      <Route exact path='/add/post' component={PostFormComponent} />
      <Route exact path='/add/post/:id' component={PostFormComponent} />
      <Route exact path='/dashboard' component={HomePageComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
};

export default Routes;
