import { Form, Input, Button, Card } from 'antd';
import { CheckoutFormPayload } from './CheckoutForm.types.ts';
import { useAuth } from '../../store/hooks.ts';
import { useCreateOrder } from '../../api/queries/order.ts';

const CheckoutForm = () => {
  const auth = useAuth();
  const createOrder = useCreateOrder();

  const onFinish = (values: CheckoutFormPayload) => {
    createOrder(values);
  };

  return (
    <Card title="Checkout Form">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>

        {!auth.isLogged ? (
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>
        ) : null}

        <Form.Item
          label="Street Address"
          name="street"
          rules={[
            { required: true, message: 'Please enter your street address' },
          ]}
        >
          <Input placeholder="123 Main St" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input placeholder="Los Angeles" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: 'Please enter your state' }]}
        >
          <Input placeholder="California" />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name="zipcode"
          rules={[
            { required: true, message: 'Please enter your zip code' },
            { pattern: /^[0-9]{5}$/, message: 'Zip code must be 5 digits' },
          ]}
        >
          <Input placeholder="90001" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please enter your Country' }]}
        >
          <Input placeholder="United States" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CheckoutForm;
