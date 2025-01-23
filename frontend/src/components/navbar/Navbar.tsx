import { useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import LeftMenu from './LeftMenu.tsx';
import RightMenu from './RightMenu.tsx';
import './Navbar.css';
import Cart from '../cart/Cart.tsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className={'menu'}>
      <div className={'menu__logo'}>
        <a href="/">Eats & Seats</a>
      </div>
      <div className={'menu__container'}>
        <div className={'menu__left'}>
          <LeftMenu mode="horizontal" />
        </div>
        <div className={'menu__right'}>
          <RightMenu mode="horizontal" />
        </div>
        <Cart />
        <Button
          className={'menu__mobile-button'}
          icon={<MenuOutlined />}
          type="primary"
          onClick={showDrawer}
        />
        <Drawer
          title="Navigation"
          className={'menu_drawer'}
          placement="right"
          closable={true}
          onClose={onClose}
          open={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
