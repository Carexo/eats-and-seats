import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import ChangePasswordForm from '../../components/admin/ChangePassword/ChangePasswordForm.tsx';
import { useAuth } from '../../store/hooks.ts';
const { Paragraph } = Typography;

const ManageYourAccount: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { isLogged, username } = useAuth();

  if (!isLogged) {
    return <div>Please log in to manage your account.</div>;
  }

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Manage Your Account
      </Typography.Title>
      <Typography.Text>
        <Paragraph
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          Welcome, {username}
        </Paragraph>
      </Typography.Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button type="primary" onClick={handleButtonClick}>
          Change Password
        </Button>
      </div>
      {showForm && <ChangePasswordForm />}
    </div>
  );
};

export default ManageYourAccount;
