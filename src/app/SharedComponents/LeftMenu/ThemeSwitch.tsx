"use client";

import { useEffect, useState } from 'react';
import { Themes } from '@/infrastructure/tools/ThemeTools';
import { useTheme } from 'next-themes';
import './ThemeSwitch.scss';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(target.id);
  };

  return (
    <div className='ThemeSwitchMainContainer'>
      <input type="radio" name="theme" id={Themes.Light} checked={resolvedTheme === Themes.Light} title="Light Theme" onChange={onChange} />
      <input type="radio" name="theme" id={Themes.Dark} checked={resolvedTheme === Themes.Dark} title="Dark Theme" onChange={onChange} />
    </div>
  );
};

export default ThemeSwitch;
