import { Button, Drawer, Flex, List, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartItem from './CartItem/CartItem.tsx';
import { useCart } from '../../store/hooks.ts';
import { useState } from 'react';
import {Link} from "react-router";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const cart = useCart();

  const handleOpenCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={handleOpenCart}>
        <ShoppingCartOutlined className="cart-icon" />
      </Button>
      <Drawer
        title="Cart"
        className={'menu_drawer'}
        placement="right"
        closable={false}
        open={isCartOpen}
        onClose={handleOpenCart}
      >
        {cart.products.length > 0 ? (
          <Flex vertical gap={8} align="center" >
            <List
                style={{width: "100%"}}
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

            <Typography.Text strong style={{ padding: '0.5rem', alignSelf: "start" }}>
              Total: ${cart.total}
            </Typography.Text>
            <Button type="primary" style={{width: "50%"}} onClick={() => setIsCartOpen(false)}>
              <Link to="/checkout">Order products</Link>
            </Button>
          </Flex>
        ) : (
            <Typography.Title level={4} style={{alignItems:'center', textAlign: 'center'}}>Your cart is empty</Typography.Title>
        )}
      </Drawer>

    </div>
  );
};

export default Cart;
