import React from 'react';
import { Form, Input, Button } from 'antd';
import { useChangePassword } from '../../../api/queries/admin.ts';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ChangePasswordPayload } from './ChangePassword.types.ts';
import { useActions } from '../../../store/hooks.ts';

const ChangePasswordForm: React.FC = () => {
  const { loginUser, notificationSend } = useActions();
  const { mutate } = useChangePassword(notificationSend, loginUser);

  const onFinish = async (values: ChangePasswordPayload) => {
    mutate(values);
  };

  return (
    <Form
      name="changePassword"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: 'auto' }}
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
      <Form.Item label="Old Password" name="oldPassword">
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Old Password"
        />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          { required: true, message: 'Please input new Password!' },
          { min: 8, message: 'Password should have at least 8 characters' },
          {
            pattern: /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            message: 'Password should contains special character',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="New Password"
        />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please input your Confirm password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
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
        <Button type="primary" htmlType="submit" block>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
