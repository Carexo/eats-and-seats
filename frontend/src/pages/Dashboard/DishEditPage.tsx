import { Flex, Typography } from 'antd';
import DishEditForm from '../../components/dishes/DishEdit/DishEditForm.tsx';

const DishEditPage = () => {
  return (
    <Flex
      vertical
      gap="middle"
      align="center"
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <Typography.Title level={2}>Edit dish</Typography.Title>
      <DishEditForm />
    </Flex>
  );
};

export default DishEditPage;
