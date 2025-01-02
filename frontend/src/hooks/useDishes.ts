import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const fetchDishes = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dishes`);
  return data;
};

export const useDishes = () => {
  return useQuery<Dish[]>({
    queryKey: ['dishes'],
    queryFn: fetchDishes}
  );
};