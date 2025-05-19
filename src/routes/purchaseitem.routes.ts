import { Router } from 'express';
import {
 
  getAllPurchaseItems,
  getPurchaseItemById,
   createPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
} from '../controllers/purchaseitem.controller';

const router = Router();

router.post('/', createPurchaseItem);
router.get('/', getAllPurchaseItems);
router.get('/:id', getPurchaseItemById);
router.put('/:id', updatePurchaseItem);
router.delete('/:id', deletePurchaseItem);

export default router;
