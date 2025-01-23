import {useCategories, useFilteredDishes, useGetMinAndMaxPrice} from '../../api/queries/dishes.ts';
import { useEffect, useMemo, useState } from 'react';
import {
  Pagination,
  Button,
  Col,
  FloatButton,
  Input,
  Row,
  Select,
  Slider,
  Space,
  Spin,
  Typography,
} from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { Dish } from '../../components/dishes/DishCard/Dish.types.ts';
import { debounce } from 'lodash';
import MenuDishCard from '../../components/dishes/MenuDishCard/MenuDishCard.tsx';
const {Option} = Select;
const OverviewDishes = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const { data: categories = [] } = useCategories();
  const { data: minAndMaxPrice } = useGetMinAndMaxPrice();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  useEffect(() => {
    if (minAndMaxPrice) {
      setPriceRange([minAndMaxPrice.minPrice, minAndMaxPrice.maxPrice]);
    }
  }, [minAndMaxPrice]);

  const { data: filteredDishes = [], isLoading } = useFilteredDishes({
    category: selectedCategory === 'All' ? '' : selectedCategory,
    maxPrice: priceRange[1].toString(),
    minPrice: priceRange[0].toString(),
    searchTerm,
    sortBy: sortOrder,
    page: currentPage,
    limit: pageSize,
  });

  useEffect(() => {
    if (filteredDishes.length > 0) {
      const maxPrice = Math.max(
        ...filteredDishes.map((dish: Dish) => dish.price),
      );
      setPriceRange([0, maxPrice]);
    }
  }, [filteredDishes]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setCurrentPage(1);
  };

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const memoizedFilteredDishes = useMemo(
    () => filteredDishes,
    [filteredDishes],
  );

  return (
    <div style={{ padding: '20px' }}>
      <Input.Search
        placeholder="Search dish..."
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
          {showFilters ? 'hide filters' : 'show filters'}
        </Button>
      </div>

      {showFilters && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ marginTop: '20px' }}>
            <Title level={5}>filter by price:</Title>
            <Slider
              range
              step={1}
              min={0}
              max={minAndMaxPrice?.maxPrice || 100}
              defaultValue={[minAndMaxPrice?.minPrice || 0, minAndMaxPrice?.maxPrice|| 100]}
              onChange={handlePriceChange}
              style={{ maxWidth: '400px', margin: '0 auto' }}
            />
            <Text>
              Range: {priceRange[0]} PLN - {priceRange[1]} PLN
            </Text>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Title level={5}>filter by price:</Title>
            <Select
              defaultValue="asc"
              style={{ width: 120 }}
              onChange={handleSortOrderChange}
            >
              <Option value="asc">ascending</Option>
              <Option value="desc">descending</Option>
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
        <>
          <Row gutter={[16, 16]} justify="center">
            {filteredDishes.dishes.map((dish: Dish) => (
              <Col key={dish.id} xs={24} sm={12} md={8} lg={6}>
                <MenuDishCard dish={dish} />
              </Col>
            ))}
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={memoizedFilteredDishes.total}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
      <FloatButton.BackTop />
    </div>
  );
};
export default OverviewDishes;
