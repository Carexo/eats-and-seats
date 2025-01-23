import { Flex, Typography } from 'antd';
import ReservationForm from '../../components/reservation/ReservationForm.tsx';

const Reservation = () => {
  return (
    <Flex vertical style={{ padding: '2rem' }}>
      <Typography.Title level={2}>Table reservation</Typography.Title>
      <ReservationForm />
    </Flex>
  );
};

export default Reservation;
