import React from 'react';
import DishDetailsElement from '../../components/dishes/SingleDishPageElement/DishDetailsElement.tsx';
import { FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useParams, useNavigate, useLocation } from 'react-router';

const AdminDishDetails: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    const handleEditClick = () => {
        navigate(`/admin/dishes/edit/${id}`, { state: { from: location.pathname } });
    };

  return (
      <>
          <DishDetailsElement />
          <FloatButton icon={<EditOutlined />} tooltip={<div>Edit</div>} onClick={handleEditClick} />
      </>
  );
};

export default AdminDishDetails;
