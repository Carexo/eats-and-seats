import { useGetReservations } from '../../api/queries/reservation.ts';
import { Card, List, Typography } from 'antd';

const ManageReservations = () => {
  const query = useGetReservations();

  if (!query.data) {
    return <div>No data</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Reservations
      </Typography.Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={query.data.data}
        renderItem={(reservation) => (
          <List.Item>
            <Card
              key={reservation._id}
              title={`Reservation for ${reservation.name}`}
              bordered={false}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <p>
                <Typography.Text strong>Name:</Typography.Text>{' '}
                {reservation.name}
              </p>
              <p>
                <Typography.Text strong>Phone:</Typography.Text>{' '}
                {reservation.phone}
              </p>
              <p>
                <Typography.Text strong>Email:</Typography.Text>{' '}
                {reservation.email}
              </p>
              <p>
                <Typography.Text strong>Date:</Typography.Text>{' '}
                {new Date(reservation.date).toLocaleDateString()}
              </p>
              <p>
                <Typography.Text strong>Time:</Typography.Text>{' '}
                {reservation.time}
              </p>
              <p>
                <Typography.Text strong>Guests:</Typography.Text>{' '}
                {reservation.guests}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManageReservations;
