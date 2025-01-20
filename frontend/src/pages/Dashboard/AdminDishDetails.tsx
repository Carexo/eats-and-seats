import React from 'react';
import DishDetailsElement from '../../components/dishes/DishDetailsElement.tsx';
import { FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router';

const AdminDishDetails: React.FC = () => {
  return (
    <>
      <DishDetailsElement />
      <Link to={`/admin/dishes/edit/${useParams().id}`}>
        <FloatButton icon={<EditOutlined />} tooltip={<div>Edit</div>} />
      </Link>
    </>
  );
};

export default AdminDishDetails;
