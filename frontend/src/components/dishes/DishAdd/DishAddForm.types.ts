import { RcFile } from 'antd/es/upload';

export interface DishEditPayload {
    image: RcFile | undefined;
    name: string;
    description: string;
    category: string;
    price: string;
}
