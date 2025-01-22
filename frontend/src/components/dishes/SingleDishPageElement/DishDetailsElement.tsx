import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
  Card,
  Typography,
  Spin,
  Alert,
  Button,
  Rate,
  Tooltip,
  Flex,
} from 'antd';
import { LeftCircleOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { useDish } from '../../../api/queries/dishes.ts';
import { useAddProductToCart } from '../../../hooks/cart/useAddProductToCart.ts';
import { useAverageRating } from '../../../api/queries/opinions.ts';
import Opinions from '../../opinions/Opinions/Opinions.tsx';
import AddOpinion from '../../opinions/AddOpinion/AddOpinion.tsx';
import './DishDetailsElement.css';

const { Title, Paragraph } = Typography;

const DishDetailsElement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addProduct = useAddProductToCart();
  const { data: averageRating, refetch } = useAverageRating(id!);
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    refetch();
    if (!isFlipped) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 50, behavior: 'smooth' });
    }
  };

  const {
    data: dish,
    isLoading: dishLoading,
    error: dishError,
  } = useDish(id ?? '');

  if (dishLoading) {
    return (
      <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    );
  }

  if (dishError) {
    return (
      <Alert
        message="Błąd"
        description={dishError.message}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  if (!dish) {
    return (
      <Alert
        message="Brak danych"
        description="Nie znaleziono szczegółów dania."
        type="warning"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  const handleAddToCart = () => {
    addProduct({
      dishId: dish.id,
      quantity: 1,
      price: dish.price,
      name: dish.name,
    });
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Card
            className="dish-card"
            style={{
              maxWidth: 700,
              margin: '50px auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            cover={
              <img
                alt={dish.name}
                src={`${dish.image}`}
                style={{
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0',
                }}
              />
            }
          >
            <div
              className="dish-header"
              style={{ textAlign: 'center', marginBottom: 20 }}
            >
              <Title level={2} style={{ fontWeight: 'bold' }}>
                {dish.name}
              </Title>
              <Paragraph style={{ fontSize: '14px', padding: '5px 10px' }}>
                {dish.category}
              </Paragraph>
            </div>
            {averageRating !== null && (
              <Paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
                <div
                  onClick={handleFlip}
                  style={{ display: 'inline-block', cursor: 'pointer' }}
                >
                  <b>Ocena:</b>{' '}
                  <Rate
                    disabled
                    allowHalf
                    value={averageRating}
                    style={{ fontSize: '18px' }}
                  />
                  <span style={{ fontSize: '13px', marginLeft: '10px' }}>
                    {averageRating === 0
                      ? '(brak opinii)'
                      : `${averageRating.toFixed(1)} / 5`}
                  </span>
                </div>
              </Paragraph>
            )}
            <Paragraph
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                textAlign: 'justify',
              }}
            >
              {dish.description}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginTop: '20px',
              }}
            >
              Cena: <span style={{ color: 'green' }}>{dish.price} zł</span>
            </Paragraph>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 30,
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ width: '49%' }}
                onClick={handleAddToCart}
              >
                Dodaj do koszyka
              </Button>
              <Button type="default" size="large" style={{ width: '49%' }}>
                Zamów teraz
              </Button>
            </div>
            <div style={{ position: 'absolute', top: 10, left: 10 }}>
              <Tooltip title="Lista wszystkich dań">
                <LeftCircleOutlined
                  style={{
                    fontSize: '36px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                  onClick={() => navigate(location.state?.from || '/menu')}
                />
              </Tooltip>
            </div>
          </Card>
        </div>
        <div className="flip-card-back">
          <Card>
            <Tooltip title="Wróć">
              <CaretLeftOutlined onClick={handleFlip} />
            </Tooltip>
            <Flex
              gap="small"
              vertical
              align="center"
              style={{ textAlign: 'center', alignItems: 'center' }}
            >
              <AddOpinion />
              <Opinions />
            </Flex>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DishDetailsElement;
