import React, { useState } from 'react';
import { List, Button, Modal, Spin, Typography, Select } from 'antd';
import { IOrder } from '../../api/services/order';
import { EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { useCancelOrder, useUserOrders } from '../../api/queries/order.ts';
import { useAuth } from '../../store/hooks.ts';

const { Title } = Typography;
const { Option } = Select;

const UserOrdersPage: React.FC = () => {
  const { username } = useAuth();
  const [sortOrder, setSortOrder] = useState<string>('');
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useUserOrders(username, sortOrder, '');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const cancelOrder = useCancelOrder();

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    refetch();
  };

  const showCancelConfirm = (order: IOrder) => {
    Modal.confirm({
      title: 'Are you sure you want to cancel this order?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        cancelOrder.mutate(order._id, {
          onSuccess: () => {
            refetch();
            setSelectedOrder(null);
          },
        });
      },
    });
  };

  const handleViewDetails = (order: IOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Orders
      </Title>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Title level={5} style={{ textAlign: 'center' }}>
          Sort by date:
        </Title>
        <Select
          defaultValue={sortOrder}
          style={{ width: 120, alignItems: 'center' }}
          onChange={handleSortOrderChange}
        >
          <Option value="">Default</Option>
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
      </div>
      <List
        itemLayout="horizontal"
        style={{ alignItems: 'center', textAlign: 'center' }}
        dataSource={orders}
        renderItem={(order: IOrder) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => handleViewDetails(order)}
              >
                View Details
              </Button>,
              <Button
                type="primary"
                danger={true}
                icon={<CloseOutlined />}
                onClick={() => showCancelConfirm(order)}
              >
                Cancel
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Order #${order._id} - ${order.status}`}
              description={`Total: $${order.total.toFixed(2)}, Date: ${new Date(order.orderDate).toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />

      {/* Modal for displaying order details */}
      <Modal
        open={!!selectedOrder}
        title={`Order Details - #${selectedOrder?._id}`}
        footer={[
          <Button key="close" onClick={handleCloseDetails}>
            Close
          </Button>,
        ]}
        onCancel={handleCloseDetails}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </p>
            <p>
              <strong>Order Date:</strong>{' '}
              {new Date(selectedOrder.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong>{' '}
              {`${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.zipcode}`}
            </p>
            <p>
              <strong>Products:</strong>
            </p>
            <ul>
              {selectedOrder.products.map((product, index) => (
                <li key={index}>
                  Dish ID: {product.dishId.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserOrdersPage;
