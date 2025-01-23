import React, { useState } from 'react';
import { List, Button, Modal, Spin, Typography, Card, Input, Rate } from 'antd';
import {
  useDeleteOpinion,
  useOpinionsByUserId,
  useUpdateOpinion,
} from '../../api/queries/opinions';
import { IExtendOpinion } from '../../api/services/opinions';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useActions, useAuth } from '../../store/hooks';

const { Title } = Typography;

const UserOpinionsPage: React.FC = () => {
  const { username } = useAuth();
  const {
    data: opinions = [],
    isLoading,
    refetch,
  } = useOpinionsByUserId(username);
  const { notificationSend } = useActions();
  const deleteOpinion = useDeleteOpinion(notificationSend);

  const [editingOpinion, setEditingOpinion] = useState<IExtendOpinion | null>(
    null,
  );
  const [newDescription, setNewDescription] = useState('');
  const [newRating, setNewRating] = useState(0);

  const updateOpinion = useUpdateOpinion(
    notificationSend,
    editingOpinion?.opinionID || '',
    {
      description: newDescription,
      rate: newRating,
    },
  );

  const handleEdit = (opinion: IExtendOpinion) => {
    setEditingOpinion(opinion);
    setNewDescription(opinion.description || '');
    setNewRating(opinion.rating);
  };

  const handleSave = () => {
    if (editingOpinion) {
      updateOpinion.mutate(undefined, {
        onSuccess: () => {
          refetch();
          setEditingOpinion(null);
        },
      });
    }
  };

  const handleDelete = (opinionID: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this opinion?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteOpinion.mutate(opinionID, {
          onSuccess: () => {
            setTimeout(() => {
              window.location.reload();
              refetch();
            }, 400);
          },
        });
      },
    });
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Opinions
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={opinions}
        renderItem={(opinion: IExtendOpinion) => (
          <Card style={{ textAlign: 'center' }}>
            <List.Item
              actions={[
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(opinion)}
                >
                  Edit
                </Button>,
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
                title={`${opinion.dish_name}`}
                description={opinion.description}
              />
              <div>Rating: {opinion.rating}</div>
            </List.Item>
          </Card>
        )}
      />
      <Modal
        title="Edit Opinion"
        visible={!!editingOpinion}
        onOk={handleSave}
        onCancel={() => setEditingOpinion(null)}
      >
        <Input.TextArea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Edit description"
        />
        <Rate
          value={newRating}
          onChange={(value) => setNewRating(value)}
          style={{ marginTop: '10px' }}
        />
      </Modal>
    </div>
  );
};

export default UserOpinionsPage;
