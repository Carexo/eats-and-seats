import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Card, Typography, Spin, Alert, Button, Rate, Tooltip } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useDish } from '../../../api/queries/dishes.ts';

const { Title, Paragraph } = Typography;

const DishDetailsElement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
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

  const rating = 2;
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

  return (
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
      {rating !== null && (
        <Paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
          <b>Ocena:</b>{' '}
          <Rate
            disabled
            allowHalf
            value={rating}
            style={{ fontSize: '18px' }}
          />
          <span style={{ fontSize: '16px', marginLeft: '10px' }}>
            ({rating.toFixed(1)} / 5)
          </span>
        </Paragraph>
      )}
      <Paragraph
        style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'justify' }}
      >
        {dish.description}
      </Paragraph>
      <Paragraph
        style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}
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
        <Button type="primary" size="large" style={{ width: '49%' }}>
          Dodaj do koszyka
        </Button>
        <Button type="default" size="large" style={{ width: '49%' }}>
          Zamów teraz
        </Button>
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <Tooltip title="Lista wszystkich dań">
          <LeftCircleOutlined
            style={{ fontSize: '36px', cursor: 'pointer', color: 'white' }}
            onClick={() => navigate(location.state?.from || '/menu')}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default DishDetailsElement;
