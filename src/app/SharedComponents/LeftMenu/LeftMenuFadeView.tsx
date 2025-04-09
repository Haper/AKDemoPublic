'use client';

import { collapseLeftMenu } from '@/infrastructure/tools/LeftMenuTools';


const LeftMenuFadeView = () => {
  return <div className={'LeftMenuFadeContainer'} onClick={() => collapseLeftMenu()}/>;
};

export default LeftMenuFadeView;
