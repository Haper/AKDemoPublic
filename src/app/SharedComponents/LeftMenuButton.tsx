"use client";

import { isLeftMenuExpended, toggleLeftMenu } from '@/infrastructure/tools/LeftMenuTools';
import type { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { getUserSettingsValue } from '@/infrastructure/tools/LocalStorage';
import Button from './Button';
import {
  MenuButtonOffIcon,
  MenuButtonOnIcon
} from './Icons';


const LeftMenuButton = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  useEffect(() => {
    const userMenuValue = getUserSettingsValue('showMenu');
    setShowLeftMenu(userMenuValue);
    if (userMenuValue !== isLeftMenuExpended()) {
      toggleLeftMenu();  
    }
  }, []);

  const onclick: MouseEventHandler<HTMLElement> = () => {
    toggleLeftMenu();
    setShowLeftMenu(!showLeftMenu);
  };

  return (
    <Button onClick={onclick} title={'Menu'}>
      {showLeftMenu
        ? <MenuButtonOnIcon width={48} height={48} />
        : <MenuButtonOffIcon width={48} height={48} />
      }
    </Button>
  );
};

export default LeftMenuButton;
