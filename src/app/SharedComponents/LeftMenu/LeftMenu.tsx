import {
  AboutIcon,
  FormsIcon,
  DiagramIcon,
  ProductsIcon,
  UsersIcon
} from '@/app/SharedComponents/Icons';
import './LeftMenu.scss';
import LeftMenuBackground from './LeftMenuBackground';
import LeftMenuFadeView from './LeftMenuFadeView';
import LeftMenuItem from './LeftMenuItem';
import ThemeSwitch from './ThemeSwitch';


const LeftMenu = () => {
  return (
    <>
      <nav className={'LeftMenuMainContainer'}>
        <LeftMenuBackground />
        <LeftMenuItem href={'/products'} title={'Products'}>
          <ProductsIcon fill='white' width={'32px'} height={'32px'} />
          &nbsp;&nbsp;
          <div>Products</div>
        </LeftMenuItem>
        <LeftMenuItem href={'/users'} title={'Users'}>
          <UsersIcon fill='white' width={'32px'} height={'32px'} />
          &nbsp;&nbsp;
          <div>Users</div>
        </LeftMenuItem>
        <LeftMenuItem href={'/graphs'} title={'Graphs'}>
          <DiagramIcon fill='white' width={'32px'} height={'32px'} />
          &nbsp;&nbsp;
          <div>Graphs</div>
        </LeftMenuItem>
        <LeftMenuItem href={'/forms'} title={'Forms'}>
          <FormsIcon fill='white' width={'32px'} height={'32px'} />
          &nbsp;&nbsp;
          <div>Forms</div>
        </LeftMenuItem>
        <LeftMenuItem href={'/'} title={'About'}>
          <AboutIcon fill='white' width={'32px'} height={'32px'} />
          &nbsp;&nbsp;
          <div>About</div>
        </LeftMenuItem>
        <div className='flex-1'/>
        <ThemeSwitch />
      </nav>
      
      <LeftMenuFadeView />
    </>
  );
};

export default LeftMenu;
