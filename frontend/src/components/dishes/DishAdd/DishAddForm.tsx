import { Button, Form, Input, Upload, InputNumber, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router';
import { DishEditPayload } from './DishAddForm.types.ts';
import { UploadChangeParam } from 'antd/es/upload';
import './DishAddForm.css';
const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  console.log('Change:', e.target.value);
};

interface DishFormProps {
  mutate: (values: DishEditPayload) => void;
}

const DishAddForm: React.FC<DishFormProps> = ({ mutate }) => {
  const navigate = useNavigate();

  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

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

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Form
        name={'New Dish'}
        style={{ maxWidth: 360, width: '100%' }}
        onFinish={onFinish}
        layout="vertical"
        validateTrigger="onBlur"
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
          <Button block type="link" onClick={() => navigate('/admin/dishes')}>
            Anuluj
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DishAddForm;
