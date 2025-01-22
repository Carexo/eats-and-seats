import {
  Button,
  InputNumber,
  InputNumberProps,
  List,
  Space,
  Typography,
} from 'antd';
import { CartItemProps } from './CartItem.types.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { useRemoveProductCart } from '../../../hooks/cart/useRemoveProductCart.ts';
import { useUpdateProductCart } from '../../../hooks/cart/useUpdateProductCart.ts';

const CartItem = ({ dishId, name, price, quantity }: CartItemProps) => {
  const removeProduct = useRemoveProductCart();
  const updateQuantity = useUpdateProductCart();

  const onChange: InputNumberProps['onChange'] = (value) => {
    const quantity = Number(value);
    if (!quantity) {
      return;
    }

    updateQuantity({ dishId: dishId, quantity });
  };

  const handleRemoveDish = () => {
    removeProduct(dishId);
  };

  return (
    <List.Item
      actions={[
        <InputNumber min={1} defaultValue={quantity} onChange={onChange} />,
        <Button
          type="text"
          danger
          onClick={handleRemoveDish}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <Typography.Text style={{ margin: 0, fontSize: '1.25rem' }}>
            {name}
          </Typography.Text>
        }
        description={
            <Space direction="vertical">
                <Typography.Text strong>Price: ${price.toFixed(2)}</Typography.Text>
                <Typography.Text strong>Total: ${(price * quantity).toFixed(2)}</Typography.Text>
            </Space>
        }
      />
    </List.Item>
  );
};

export default CartItem;
