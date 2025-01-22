import { Card, List, Typography } from 'antd';
import { useCart } from '../../store/hooks.ts';
import CartItem from "../cart/CartItem/CartItem.tsx";

const CartOverview = () => {
  const cart = useCart();

  return (
    <Card title="Cart Overview">
      <List
        dataSource={cart.products}
        renderItem={(item) => (
            <CartItem dishId={item.dishId} name={item.name} price={item.price} quantity={item.quantity} />
        )}
      />
      <Typography.Title level={4} style={{ marginTop: '20px' }}>
        Total: ${cart.total}
      </Typography.Title>
    </Card>
  );
};

export default CartOverview;
