import React, {Fragment} from 'react';

import SideBar from '../SideBar/SideBar.component';

const PageContainer = ({component: Component}) => {
  return class DefaultPageContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <div className='page'>
            <SideBar />
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
