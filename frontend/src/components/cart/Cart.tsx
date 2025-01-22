import {Button, Drawer, Flex, List, Typography} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItem from './CartItem/CartItem.tsx';
import { useCart } from '../../store/hooks.ts';
import { useState } from 'react';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const cart = useCart();

  const handleOpenCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="cart-container">
      <Button onClick={handleOpenCart}>
        <ShoppingCartOutlined className="cart-icon" />
      </Button>
      <Drawer
        title="Koszyk"
        className={'menu_drawer'}
        placement="right"
        closable={false}
        open={isCartOpen}
        onClose={handleOpenCart}
      >
        {cart.products.length > 0 ? (
          <Flex vertical gap={5}>
            <List
              bordered
              dataSource={cart.products}
              renderItem={(item) => (
                <CartItem
                  key={item.dishId}
                  name={item.name}
                  dishId={item.dishId}
                  price={item.price}
                  quantity={item.quantity}
                />
              )}
            />

            <Typography.Text strong style={{padding: "0.5rem"}}>Total: ${cart.total}</Typography.Text>
          </Flex>
        ) : (
          <Typography.Text>Your cart is empty</Typography.Text>
        )}
      </Drawer>
    </div>
  );
};

export default Cart;
