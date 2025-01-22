import { Button, Flex, InputNumber, InputNumberProps, Typography } from 'antd';
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
    <Flex vertical gap={2}>
      <Typography.Title level={3}>{name}</Typography.Title>
      <Flex vertical>
        <Typography.Text>price: {price}</Typography.Text>

        <Typography.Text>
          quantity:
          <InputNumber min={1} onChange={onChange} defaultValue={quantity} />
        </Typography.Text>
        <Button onClick={handleRemoveDish}>
          <DeleteOutlined />
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartItem;
