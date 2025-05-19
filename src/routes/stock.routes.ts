import { Router } from 'express';
import {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
} from '../controllers/stock.controller';

const router = Router();

router.get('/', getAllStocks);
router.get('/:id', getStockById);
router.post('/', createStock);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);
export default router;
