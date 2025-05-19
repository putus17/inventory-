import { Router } from 'express';
import {
  createSaleItem,
  getAllSaleItems,
  getSaleItemById,
  updateSaleItem,
  deleteSaleItem
} from '../controllers/saleitem.controller';

const router = Router();


router.get('/', getAllSaleItems);
router.get('/:id', getSaleItemById);
router.post('/', createSaleItem);
router.put('/:id', updateSaleItem);
router.delete('/:id', deleteSaleItem);

export default router;
