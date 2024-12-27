import express from 'express';
import { Dish } from '../models/DishModel';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const dishes = await Dish.find();
      res.json(dishes);
  } catch (error) {
        res.status(500).json({ message: 'Server Error' });
  }
});

export default router;