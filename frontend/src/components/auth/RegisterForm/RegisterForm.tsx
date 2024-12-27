import { Button, Form, Input, notification } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { RegisterUserPayload } from './RegisterForm.types.ts';
import { useRegister } from '../../../api/queries/auth.ts';

const RegisterForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const { mutate } = useRegister(api);
  const onFinish = (values: RegisterUserPayload) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="login"
        style={{ maxWidth: 360, width: '100%' }}
        onFinish={onFinish}
        layout={'vertical'}
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
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
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please input your Confirm password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Repeat your password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign up
          </Button>
          or <Link to="/auth/signin">Log in now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
