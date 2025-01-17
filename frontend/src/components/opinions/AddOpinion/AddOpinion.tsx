import { Button, Form, Input, Rate, Typography } from 'antd';
import { OpinionPayload } from './AddOpinion.types.ts';
import { useActions, useAuth } from '../../../store/hooks.ts';
import { useAddOpinion } from '../../../api/queries/opinions.ts';
import { useParams } from 'react-router';

const AddOpinion = () => {
  const { id: dishID } = useParams<{ id: string }>();
  const { notificationSend } = useActions();

  const { isLogged } = useAuth();
  const { mutate } = useAddOpinion(notificationSend);

  const onFinish = (values: OpinionPayload) => {
    console.log(values);

    mutate({ dishID: dishID || '', opinion: values });
  };

  return (
    <>
      {isLogged ? (
        <>
          <Typography.Title level={4}>Rate dish</Typography.Title>
          <Form
            onFinish={onFinish}
            initialValues={{ rate: 1 }}
            layout={'vertical'}
            style={{ minWidth: '200px', width: '50%', maxWidth: '400px' }}
          >
            <Form.Item
              name="rate"
              label="Rating"
              rules={[
                () => ({
                  validator(_, value) {
                    if (value >= 1) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('Rating must be at least one star.'),
                    );
                  },
                }),
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Rate
            </Button>
          </Form>
        </>
      ) : (
        <Typography.Title level={4}>
          Please login to make a rate
        </Typography.Title>
      )}
    </>
  );
};

export default AddOpinion;
