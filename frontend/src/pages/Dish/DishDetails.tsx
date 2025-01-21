import AddOpinion from '../../components/opinions/AddOpinion/AddOpinion.tsx';
import { Flex } from 'antd';
import Opinions from '../../components/opinions/Opinions/Opinions.tsx';
import DishDetailsElement from '../../components/dishes/SingleDishPageElement/DishDetailsElement.tsx';

const DishDetails = () => {
  return (
    <Flex gap="small" vertical align="center">
      <DishDetailsElement />
      <Opinions />
      <AddOpinion />
    </Flex>
  );
};

export default DishDetails;
