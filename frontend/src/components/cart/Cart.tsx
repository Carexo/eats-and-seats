import {Button, Drawer, Typography} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItem from './CartItem/CartItem.tsx';
import { useCart } from '../../store/hooks.ts';
import {useRef, useState } from 'react';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const cart = useCart();

  /*useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);*/

  const items = cart.products.map((item) => (
    <CartItem
      key={item.dishId}
      name={item.name}
      dishId={item.dishId}
      price={item.price}
      quantity={item.quantity}
    />
  ));

  items.push(<Typography.Text>Total: {cart.total}</Typography.Text>);

  const handleOpenCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="cart-container" ref={cartRef}>
      <Button onClick={handleOpenCart}>
        <ShoppingCartOutlined className="cart-icon" />
      </Button>
          <Drawer
              title="Koszyk"
              className={"menu_drawer"}
              placement="right"
              closable={false}
              open={isCartOpen}
              onClose={handleOpenCart}>
            {items.length > 1 ? items : <p>Your cart is empty</p>}
          </Drawer>
    </div>
  );
};

export default Cart;
