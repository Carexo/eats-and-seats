import { Col, Flex, Row, Typography } from 'antd';
import CheckoutForm from '../../components/checkout/CheckoutForm.tsx';
import CartOverview from '../../components/checkout/CartOverview.tsx';

const Checkout = () => {
  return (
    <Flex vertical style={{ padding: '2rem' }}>
      <Typography.Title level={2}>Checkout</Typography.Title>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '50px' }}>
        <Col xs={24} md={12}>
            <CheckoutForm />
        </Col>
        <Col xs={24} md={12}>
          <CartOverview />
        </Col>
      </Row>
    </Flex>
  );
};

export default Checkout;
