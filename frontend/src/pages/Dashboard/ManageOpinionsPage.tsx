import React, { useState } from 'react';
import { List, Button, Modal, Spin, Typography, Select } from 'antd';
import { useAllOpinions, useDeleteOpinion } from '../../api/queries/opinions';
import { IExtendOpinion } from '../../api/services/opinions';
import { DeleteOutlined } from '@ant-design/icons';
import { useActions } from '../../store/hooks';

const { Title } = Typography;
const { Option } = Select;

const ManageOpinionsPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>('');
  const { data: opinions = [], isLoading, refetch } = useAllOpinions(sortOrder);
  const { notificationSend } = useActions();
  const deleteOpinion = useDeleteOpinion(notificationSend);

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    refetch();
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
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Title level={5} style={{ textAlign: 'center' }}>
          sort by opinion level:
        </Title>
        <Select
          defaultValue={sortOrder}
          style={{ width: 120, alignItems: 'center' }}
          onChange={handleSortOrderChange}
        >
          <Option value="">default</Option>
          <Option value="asc">ascending</Option>
          <Option value="desc">descending</Option>
        </Select>
      </div>
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
