import express, { Router } from 'express';
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} from '../controllers/sale.controller';

const router = Router();


router.get('/', getAllSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;
