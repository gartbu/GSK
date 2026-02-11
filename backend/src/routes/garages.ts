import { Router } from 'express';
import { getAllGarages } from '../models/Garage';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const garages = await getAllGarages();
    res.json(garages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;