import { Flex, Typography } from 'antd';
import LogInForm from '../../../components/auth/LoginForm/LogInForm.tsx';

const SignIn = () => {
  return (
    <Flex
      vertical
      gap="middle"
      align="center"
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <Typography.Title level={2}>Log in to your account</Typography.Title>
      <LogInForm />
    </Flex>
  );
};

export default SignIn;
