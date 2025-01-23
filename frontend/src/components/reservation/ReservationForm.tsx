import {Button, Card, DatePicker, Form, Input, InputNumber, TimePicker} from "antd";
import {ReservationFormValues} from "./Reservation.types.ts";
import {useAddReservation} from "../../api/queries/reservation.ts";

const ReservationForm = () => {
    const [form] = Form.useForm();
    const {mutate} = useAddReservation()

    const onFinish = (values: ReservationFormValues) => {
        mutate({
            name: values.name,
            phone: values.phone,
            email: values.email,
            date: values.date.format('YYYY-MM-DD'),
            time: values.time.format('HH:mm'),
            guests: values.guests
        })
        form.resetFields();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card title="Table Reservation" style={{width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="John Doe" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="+1 234 567 890" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                    >
                        <Input placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item
                        label="Reservation Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Reservation Time"
                        name="time"
                        rules={[{ required: true, message: 'Please select a time' }]}
                    >
                        <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Number of Guests"
                        name="guests"
                        rules={[{ required: true, message: 'Please enter the number of guests' }]}
                    >
                        <InputNumber min={1} max={20} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Reserve Table
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ReservationForm;