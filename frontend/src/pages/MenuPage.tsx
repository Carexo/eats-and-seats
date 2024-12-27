import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const MenuPage = () => {
  const [dishes, setDishes] = useState<any[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3000/menu')
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error("Error fetching the menu:", error);
            });
    }, []);

    return (
        <div className="menu-page">
            <h1>Menu</h1>
            <Row gutter={16}>
                {dishes.map(dish => (
                    <Col span={8} key={dish._id}>
                        <Card
                            hoverable
                            cover={<img alt={dish.name} src={dish.imageUrl || 'default-image.jpg'} />}
                        >
                            <Meta title={dish.name} description={`${dish.description} - $${dish.price}`} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MenuPage;