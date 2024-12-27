import { Flex, Typography } from 'antd';
import RegisterForm from '../../../components/auth/RegisterForm/RegisterForm.tsx';

const SignUp = () => {
  return (
    <Flex
      vertical
      gap="middle"
      align="center"
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <Typography.Title level={2}>Create an account</Typography.Title>
      <RegisterForm />
    </Flex>
  );
};

export default SignUp;
