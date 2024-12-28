import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
  Space,
  Button,
  Slider,
  Input,
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const categories = ['All', 'Greek', 'Pizza'];

const MenuPage = () => {
  interface Dish {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string; // Upewnij się, że każde danie ma kategorię
  }

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/dishes`)
      .then((response) => {
        setDishes(response.data);
        setLoading(false);
        const maxPrice = Math.max(
          ...response.data.map((dish: Dish) => dish.price),
        );
        setMaxPrice(maxPrice);
        setPriceRange([0, maxPrice]);
        setFilteredDishes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the menu:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterDishes();
  }, [selectedCategory, priceRange, searchTerm]);

  const filterDishes = () => {
    let filtered = dishes;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (dish) =>
          dish.category &&
          dish.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }
    filtered = filtered.filter(
      (dish) => dish.price >= priceRange[0] && dish.price <= priceRange[1],
    );
    if (searchTerm) {
      filtered = filtered.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredDishes(filtered);
  };
  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Menu
      </Title>

      <Input.Search
        placeholder="Szukaj dania..."
        allowClear
        onSearch={handleSearch}
        style={{
          marginBottom: '20px',
          maxWidth: '400px',
          margin: '0 auto',
          display: 'block',
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          icon={showFilters ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
          variant="text"
          color="primary"
          style={{ margin: '5px 0' }}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? 'Ukryj filtry' : 'Dodaj filtry'}
        </Button>
      </div>

      {showFilters && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          {categories.map((category) => (
            <Button
              key={category}
              type="default"
              style={{ margin: '0 5px' }}
              onClick={() => handleFilter(category)}
            >
              {category}
            </Button>
          ))}

          <div style={{ marginTop: '20px' }}>
            <Title level={5}>Filtruj według ceny:</Title>
            <Slider
              range
              step={1}
              min={0}
              max={maxPrice}
              defaultValue={[0, maxPrice]}
              onChange={handlePriceChange}
              style={{ maxWidth: '400px', margin: '0 auto' }}
            />
            <Text>
              Zakres: {priceRange[0]} zł - {priceRange[1]} zł
            </Text>
          </div>
        </div>
      )}

      {loading ? (
        <Space
          size="middle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Spin size="large" />
        </Space>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {filteredDishes.map((dish) => (
            <Col key={dish._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={dish.name}
                    src={dish.image || 'https://via.placeholder.com/300'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Title level={4}>{dish.name}</Title>
                <Text type="secondary">{dish.description}</Text>
                <div style={{ marginTop: '10px' }}>
                  <Text strong style={{ fontSize: '16px' }}>
                    {dish.price} zł
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MenuPage;
