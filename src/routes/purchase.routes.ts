import express, { Router } from 'express';
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase
} from '../controllers/purchase.controller';

const router = Router();

router.get('/', getAllPurchases);
router.get('/:id', getPurchaseById);
router.post('/', createPurchase);
router.put('/:id', updatePurchase);
router.delete('/:id', deletePurchase);


export default router;

