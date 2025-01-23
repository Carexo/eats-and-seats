import { Avatar, Button, Card, Col, Tooltip, Typography, Modal, Spin, List } from 'antd';
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { User } from './User.types.ts';
import { useDeleteUser } from '../../api/queries/users.ts';
import { useActions } from '../../store/hooks.ts';
import {useState} from "react";
import {useUserOrders} from "../../api/queries/order.ts";
import { IOrder } from '../../api/services/order.ts';

const { Title, Text } = Typography;

const UserCard = ({ user }: { user: User }) => {
  const { notificationSend } = useActions();
  const deleteUser = useDeleteUser(notificationSend);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: orders = [], isLoading } = useUserOrders('admin_view','',user._id);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteUser.mutate(user._id, {
          onSuccess: () => {
            setTimeout(() => {
              window.location.reload();
            }, 400);
          },
        });
      },
    });
  };

    const handleSeeOrders = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

  return (
    <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        classNames={{ body: 'dish-card' }}
        cover={
          <Avatar
            style={{ backgroundColor: '#3875F9', verticalAlign: 'middle' }}
            icon={<UserOutlined />}
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
          <Title level={4}>{user.username}</Title>
          <Text type="secondary">{user.email}</Text>
          <Text type="secondary">id: {user._id}</Text>
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
              style={{ width: '80%' }}
              onClick={handleSeeOrders}
            >
              See orders
            </Button>
            <Tooltip title="Remove user">
              <Button
                size="large"
                style={{ width: '18%' }}
                icon={<UserDeleteOutlined />}
                onClick={showDeleteConfirm}
              ></Button>
            </Tooltip>
          </div>
        </div>
      </Card>
        <Modal
            open={isModalVisible}
            title="User Orders"
            footer={null}
            onCancel={handleCloseModal}
        >
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={orders}
                    renderItem={(order: IOrder) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`Order #${order._id} - ${order.status}`}
                                description={`Total: $${order.total.toFixed(2)}, Date: ${new Date(order.orderDate).toLocaleDateString()}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    </Col>
  );
};

export default UserCard;
