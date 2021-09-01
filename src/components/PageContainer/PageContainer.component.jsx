import React, { Fragment } from 'react';
import './PageContainer.css';
import SideBar from '../SideBar/SideBar.component';

const PageContainer = ({ component: Component }) => {
  return class DefaultPageContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <div className='style-page'>
            <div id='content'>
              <Component {...this.props} />
            </div>
          </div>
        </Fragment>
      );
    }
  };
};

export default PageContainer;
