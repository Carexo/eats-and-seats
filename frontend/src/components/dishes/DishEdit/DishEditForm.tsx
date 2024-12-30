import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Spin,
  Alert,
  InputNumber,
  UploadFile,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useParams } from 'react-router';
import { DishEditPayload } from './DishEditForm.types';
const { TextArea } = Input;
import { useUpdateDish } from '../../../api/queries/dishes.ts';
import { useDish } from '../../../api/queries/dishes.ts';

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  console.log('Change:', e.target.value);
};

const DishEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [api, contextHolder] = notification.useNotification();
  const { mutate } = useUpdateDish(api, id!);

  const onChangeFile = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values: DishEditPayload) => {
    const updatedValues = {
      ...values,
      image: fileList[0].originFileObj, // Nowy plik
    };
    mutate(updatedValues);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const {
    data: dish,
    isLoading: dishLoading,
    error: dishError,
  } = useDish(id ?? '');

  const [fileList, setFileList] = React.useState<UploadFile[]>(
    (dish?.image
      ? [
          {
            uid: '-1',
            name: 'Current Image',
            status: 'done',
            url: `${dish.image}`,
          },
        ]
      : []) as UploadFile[],
  );

  if (dishLoading) {
    return (
      <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
    );
  }
  if (dishError) {
    return (
      <Alert
        message="Błąd"
        description={dishError.message}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <>
      {contextHolder}
      <Form
        name="Edit"
        style={{ maxWidth: 360, width: '100%' }}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger="onBlur"
        initialValues={{
          name: dish?.name,
          description: dish?.description,
          category: dish?.category,
          price: dish?.price,
        }}
      >
        <Form.Item
          label="Dish name"
          name="name"
          rules={[{ required: true, message: 'Please input dish name' }]}
        >
          <Input placeholder="name" value={'Name'} />
        </Form.Item>
        <Form.Item
          label="Photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please input dish photo' }]}
        >
          <Upload
            maxCount={1}
            listType="picture-card"
            beforeUpload={() => false}
            onChange={onChangeFile}
            fileList={fileList}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload photo</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input dish description' }]}
        >
          <TextArea
            rows={5}
            showCount
            maxLength={500}
            onChange={onChange}
            placeholder="description"
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input category name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Zapisz zmiany
          </Button>
          <Link to={`/admin/dishdetails/${id}`}>
            <Button block type="link">
              Anuluj
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default DishEditForm;
