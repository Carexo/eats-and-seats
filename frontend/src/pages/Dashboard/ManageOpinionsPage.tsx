import React from 'react';
import { List, Button, Modal, Spin, Typography } from 'antd';
import { useAllOpinions, useDeleteOpinion } from '../../api/queries/opinions';
import { IExtendOpinion } from '../../api/services/opinions';
import { DeleteOutlined } from '@ant-design/icons';
import { useActions } from '../../store/hooks';

const { Title } = Typography;

const ManageOpinionsPage: React.FC = () => {
    const { data: opinions = [], isLoading } = useAllOpinions();
    const { notificationSend } = useActions();
    const deleteOpinion = useDeleteOpinion(notificationSend);

    const handleDelete = (opinionID: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this opinion?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteOpinion.mutate(opinionID);
            },
        });
    };

    if (isLoading) {
        return <Spin size="large" />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Opinions</Title>
            <List
                itemLayout="horizontal"
                dataSource={opinions}
                renderItem={(opinion: IExtendOpinion) => (
                    <List.Item
                        actions={[
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(opinion.opinionID)}
                            >
                                Delete
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={`${opinion.username} - ${opinion.dish_name}`}
                            description={opinion.description}
                        />
                        <div>Rating: {opinion.rating}</div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ManageOpinionsPage;