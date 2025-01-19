import { Flex, List, Rate, Typography } from 'antd';

import { IOpinion } from '../../../api/services/opinions.ts';

const Opinion = ({ opinion }: { opinion: IOpinion }) => {
  return (
    <List.Item>
      {/*<List.Item.Meta title={opinion.username} />*/}
      <Flex vertical gap="small">
        <Typography.Title level={5}>{opinion.username}</Typography.Title>

        <Rate value={opinion.rating} disabled />
        {opinion.description}
      </Flex>
    </List.Item>
  );
};

export default Opinion;
