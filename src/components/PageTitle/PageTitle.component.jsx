import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({title}) => {
  let defaultTitle =
    'Tech Blog - Where Developers Learn, Share, & Build Careers';

  return (
    <Helmet>
      <title>{title ? title : defaultTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
