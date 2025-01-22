import { Flex } from 'antd';
import DishDetailsElement from '../../components/dishes/SingleDishPageElement/DishDetailsElement.tsx';

const DishDetails = () => {
  return (
    <Flex gap="small" vertical align="center">
      <DishDetailsElement />
    </Flex>
  );
};

export default DishDetails;
