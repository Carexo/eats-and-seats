import { Flex, Typography } from 'antd';
import DishAddForm from '../../components/dishes/DishAdd/DishAddForm.tsx';
import { useActions } from '../../store/hooks.ts';
import { useAddDish } from '../../api/queries/dishes.ts';

const DishEditPage = () => {
  const { notificationSend } = useActions();
  const mutate = useAddDish(notificationSend).mutate;

  return (
    <Flex
      vertical
      gap="middle"
      align="center"
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <Typography.Title level={2}>Add dish</Typography.Title>
      <DishAddForm mutate={mutate} />
    </Flex>
  );
};

export default DishEditPage;
