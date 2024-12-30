import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { LoginUserPayload } from './LoginForm.types.ts';

import { useLogIn } from '../../../api/queries/auth.ts';
import { useActions } from '../../../store/hooks.ts';

const LogInForm = () => {
  const { loginUser, notificationSend } = useActions();
  const { mutate } = useLogIn(notificationSend, loginUser);

  const onFinish = async (values: LoginUserPayload) => {
    mutate(values);
  };

  return (
    <Form
      name="login"
      style={{ maxWidth: 360, width: '100%' }}
      onFinish={onFinish}
      layout={'vertical'}
      validateTrigger="onBlur"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Sign In
        </Button>
        or <Link to="/auth/signup">Register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LogInForm;
