import { useEffect, useState } from 'react';
import { useDishes, useCategories } from '../../api/queries/dishes.ts';
import './MenuPage.css';

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
  Select,
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const MenuPage = () => {

  // TODO: THIS HAS TO USE ITS OWN REQUEST AS ITS ABSURDLY SLOW NOW
  const { data: categories = [] } = useCategories();
  const { data: dishes = [], isLoading, error } = useDishes();
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    if (dishes.length>0) {
      setFilteredDishes(dishes);
      const maxPrice = Math.max(...dishes.map((dish: Dish) => dish.price));
      setMaxPrice(maxPrice);
      setPriceRange([0, maxPrice]);
    }
  }, [dishes]);

  useEffect(() => {
    filterDishes();
  }, [selectedCategory, priceRange, searchTerm, sortOrder]);

  const filterDishes = () => {
    let filtered = dishes || [];
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
    filtered = filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
    );
    setFilteredDishes(filtered);
  };
  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
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
          <div style={{ marginTop: '20px' }}>
            <Title level={5}>Sortuj według ceny:</Title>
            <Select
              defaultValue="asc"
              style={{ width: 120 }}
              onChange={handleSortOrderChange}
            >
              <Option value="asc">Rosnąco</Option>
              <Option value="desc">Malejąco</Option>
            </Select>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {['All', ...categories].map((category) => (
          <Button
            key={category}
            type="default"
            style={{ margin: '0 5px' }}
            onClick={() => handleCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

        {isLoading ? (
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
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  classNames={{ body: 'dish-card' }}
                  cover={
                    <img
                      alt={dish.name}
                      src={dish.image || 'https://via.placeholder.com/300'}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Title level={4}>{dish.name}</Title>
                    <Text type="secondary">{dish.description}</Text>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 0,
                    marginTop: '40px',
                    paddingTop: '10px',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <Text strong style={{ fontSize: '20px' }}>
                      {dish.price} zł
                    </Text>
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '10px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                      <Button size='large' style={{ width: '49%' }} href={`/dishes/${dish.id}`}>Zobacz więcej</Button>
                      <Button size='large' style={{ width: '49%' }} type="primary" icon={<ShoppingCartOutlined />}>Dodaj
                        do koszyka</Button>
                    </div>
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
