import { Card, Button, Tooltip, Avatar, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Dish } from './Dish.types.ts';
import { useDeleteDish } from '../../../api/queries/dishes.ts';
import { useNavigate } from 'react-router-dom';
import { useActions } from "../../../store/hooks.ts";
import './DishCard.css'; // Import the CSS file

const DishCard = ({ dish }: { dish: Dish }) => {
    const navigate = useNavigate();
    const { notificationSend } = useActions();
    const deleteDish = useDeleteDish(notificationSend);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this dish?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteDish.mutate(dish.id, {
                    onSuccess: () => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 400);
                    },
                });
            },
        });
    };

    const handleEdit = () => {
        navigate(`/admin/dishes/edit/${dish.id}`, { state: { from: location.pathname } });
    };

    const handleViewDetails = () => {
        navigate(`/admin/dishdetails/${dish.id}`, {state: {from: location.pathname}});
    };

    return (
        <Card
            hoverable
            cover={<img alt={dish.name} src={dish.image} className="dish-image" />}
            actions={[
                <Tooltip title="Edit">
                    <Button icon={<EditOutlined />} onClick={handleEdit} />
                </Tooltip>,
                <Tooltip title="Delete">
                    <Button icon={<DeleteOutlined />} onClick={handleDelete} />
                </Tooltip>,
                <Tooltip title="View Details">
                    <Button icon={<EyeOutlined />} onClick={handleViewDetails} />
                </Tooltip>,
            ]}
            className="dish-card"
        >
            <Card.Meta
                avatar={<Avatar src={dish.image} />}
                title={dish.name}
                description={`Price: ${dish.price} €`}
            />
        </Card>
    );
};

export default DishCard;