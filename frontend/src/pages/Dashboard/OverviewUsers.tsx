import { useEffect, useState } from 'react';
import { useUsers } from '../../api/queries/users.ts';

import {
    Card,
    Col,
    Row,
    Typography,
    Spin,
    Space,
    Button,
    Input,
    Avatar,
    Tooltip,
} from 'antd';
import { UserOutlined, UserDeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MenuPage = () => {
    type User = {
        _id: string;
        username: string;
        email: string;
    }

    const { data: users = [], isLoading, error } = useUsers();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    if (error) {
        console.error('Error fetching users:', error);
    }

    useEffect(() => {
        if (users.length>0) {
            setFilteredUsers(users);
        }
    }, [users]);

    useEffect(() => {
        filterUsers();
    }, [searchTerm]);

    const filterUsers = () => {
        let filtered = users || [];
        if (searchTerm) {
            filtered = filtered.filter((user) =>
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
                placeholder="Szukaj użytkownika..."
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
                        <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                                classNames={{ body: 'dish-card' }}
                                cover={
                                    <Avatar
                                        icon={<UserOutlined />}
                                    />
                                }
                            >
                                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Title level={4}>{user.username}</Title>
                                    <Text type="secondary">{user.email}</Text>
                                    <Text type="secondary">id: {user._id}</Text>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 0,
                                    marginTop: '40px',
                                    paddingTop: '10px',
                                    borderTop: '1px solid #f0f0f0'
                                }}>
                                    <div style={{
                                        marginTop: 'auto',
                                        paddingTop: '10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Button size='large' style={{ width: '80%' }} href={`/orders/${user._id}`}>Zobacz zamówienia</Button>
                                        <Tooltip title="Remove user">
                                        <Button size='large' style={{width: '18%' }} icon={<UserDeleteOutlined />}></Button>
                                        </Tooltip>
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