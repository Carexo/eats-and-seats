import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Typography, Spin, Alert, Button, Rate } from 'antd';
import axios from 'axios';

const { Title, Paragraph } = Typography;

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

type Opinion = {
  rating: number;
  [key: string]: any;
};

const DishDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const dishResponse = await axios.get<Dish>(
          `http://localhost:3000/api/dishes/${id}`,
        );
        setDish(dishResponse.data);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        return;
      }

      try {
        const opinionsResponse = await axios.get(
          `http://localhost:3000/api/opinions/${id}`,
        );
        const { opinions } = opinionsResponse.data;
        let averageRating = 0;
        if (opinions.length > 0) {
          averageRating =
            opinions.reduce(
              (sum: number, opinion: Opinion) => sum + opinion.rating,
              0,
            ) / opinions.length;
        }
        setRating(averageRating);
      } catch {
        console.warn('Nieudane ładowanie opinii');
      } finally {
        setLoading(false);
      }
    };
    fetchDishDetails();
  }, [id]);

  if (loading) {
    return (
      <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    );
  }

  if (error) {
    return (
      <Alert
        message="Błąd"
        description={error}
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
          src={dish.image}
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
    </Card>
  );
};

export default DishDetails;
