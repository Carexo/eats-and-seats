import { useOpinions } from '../../../api/queries/opinions.ts';
import { useParams } from 'react-router';
import { List, Spin } from 'antd';
import Opinion from '../Opinion/Opinion.tsx';

const Opinions = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: opinions,
    error: opinionsError,
    isLoading,
  } = useOpinions(id ?? '');

  if (opinionsError) {
    console.warn(opinionsError);
  }

  if (isLoading) {
    return (
      <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    );
  }

  return (
    <List
      style={{ maxWidth: '600px' }}
      itemLayout="vertical"
      dataSource={opinions}
      renderItem={(opinion) => (
        <Opinion key={opinion.opinionID} opinion={opinion} />
      )}
    />
  );
};

export default Opinions;
