import { Flex, Typography } from 'antd';
import DishEditForm from '../../components/dishes/DishEdit/DishEditForm.tsx';
import { useActions } from '../../store/hooks.ts';
import { useParams } from 'react-router';
import { useUpdateDish } from '../../api/queries/dishes.ts';

const DishEditPage = () => {
  const { notificationSend } = useActions();
  const { id } = useParams<{ id: string }>();
  const mutate = useUpdateDish(notificationSend, id!).mutate;

  return (
    <Flex
      vertical
      gap="middle"
      align="center"
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <Typography.Title level={2}>Edit dish</Typography.Title>
      <DishEditForm mutate={mutate} />
    </Flex>
  );
};

export default DishEditPage;
