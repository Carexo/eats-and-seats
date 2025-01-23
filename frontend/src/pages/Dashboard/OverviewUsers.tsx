import { useEffect, useState } from 'react';
import { useUsers } from '../../api/queries/users.ts';

import { Row, Typography, Spin, Space, Input, FloatButton } from 'antd';
import UserCard from '../../components/users/UserCard.tsx';

const { Title } = Typography;

const MenuPage = () => {
  type User = {
    _id: string;
    username: string;
    email: string;
  };

  const { data: users = [], isLoading, error } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (error) {
    console.error('Error fetching users:', error);
  }

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  useEffect(() => {
    filterUsers();
  }, [searchTerm]);

  const filterUsers = () => {
    let filtered = users || [];
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredUsers(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Users
      </Title>

      <Input.Search
        placeholder="Search user..."
        allowClear
        onSearch={handleSearch}
        style={{
          margin: 'auto',
          marginBottom: '20px',
          maxWidth: '400px',
          display: 'block',
        }}
      />

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
          {filteredUsers.map((user) => (
            <UserCard user={user} />
          ))}
        </Row>
      )}
      <FloatButton.BackTop />
    </div>
  );
};

export default MenuPage;
