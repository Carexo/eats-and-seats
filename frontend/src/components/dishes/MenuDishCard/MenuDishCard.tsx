import { Card, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Dish } from './Dish.types.ts';
import './MenuDishCard.css';
import { useAddProductToCart } from '../../../hooks/cart/useAddProductToCart.ts';
import { Product } from '../../../store/cart/state.types.ts';
const { Title, Text } = Typography;

const MenuDishCard = ({ dish }: { dish: Dish }) => {
  const addToCart = useAddProductToCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      classNames={{ body: 'dish-card' }}
      cover={
        <img
          alt={dish.name}
          src={dish.image}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      }
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Title level={4}>{dish.name}</Title>
        <Text type="secondary">{dish.description}</Text>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 0,
          marginTop: '40px',
          paddingTop: '10px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <Text strong style={{ fontSize: '20px', textAlign: 'center' }}>
          {dish.price} PLN
        </Text>
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button
            size="large"
            style={{ width: '49%' }}
            href={`/dishes/${dish.id}`}
          >
            See more
          </Button>
          <Button
            size="large"
            style={{ width: '49%' }}
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() =>
              handleAddToCart({
                dishId: dish.id,
                quantity: 1,
                price: dish.price,
                name: dish.name,
              })
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuDishCard;
