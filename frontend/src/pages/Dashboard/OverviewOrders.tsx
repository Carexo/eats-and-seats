import React, { useState } from 'react';
import { List, Button, Modal, Spin, Typography } from 'antd';
import { IOrder } from '../../api/services/order';
import {CloseOutlined, EyeOutlined} from '@ant-design/icons';
import {useCancelOrder, useOrders} from "../../api/queries/order.ts";

const { Title } = Typography;

const ManageOrdersPage: React.FC = () => {
    const { data: orders = [], isLoading, refetch } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const cancelOrder = useCancelOrder();

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
            <List
                itemLayout="horizontal"
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
                            <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
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

export default ManageOrdersPage;
