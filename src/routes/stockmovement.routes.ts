import { Router } from 'express';
import {
  getAllStockMovements,
  getStockMovementById,
  createStockMovement,
  updateStockMovement,
  deleteStockMovement
} from '../controllers/stockmovement.controller';

const router = Router();

router.get('/', getAllStockMovements);
router.get('/:id', getStockMovementById);
router.post('/', createStockMovement);
router.put('/:id', updateStockMovement); 
router.delete('/:id', deleteStockMovement);

export default router;
