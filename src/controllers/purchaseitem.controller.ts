import { Request, Response } from 'express';
import PurchaseItem from '../models/PurchaseItem.model';
import { handleError } from '../utlis/auth.utlis';

// Create a PurchaseItem
export const createPurchaseItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { purchase, product, quantity, price } = req.body;

    if (!purchase || !product || quantity == null || price == null) {
      res.status(400).json({ message: 'All fields are required: purchase, product, quantity, price.' });
      return;
    }

    const purchaseItem = await PurchaseItem.create({ purchase, product, quantity, price });

    res.status(201).json({ message: 'Purchase item created successfully', purchaseItem });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all PurchaseItems
export const getAllPurchaseItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await PurchaseItem.find()
      .populate('purchase product')
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    handleError(res, error);
  }
};

// Get PurchaseItem by ID
export const getPurchaseItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await PurchaseItem.findById(req.params.id).populate('purchase product');

    if (!item) {
      res.status(404).json({ message: 'Purchase item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    handleError(res, error);
  }
};

// Update PurchaseItem 
export const updatePurchaseItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { purchase, product, quantity, price } = req.body;

   

    const updatedItem = await PurchaseItem.findByIdAndUpdate(
      req.params.id,
      { purchase, product, quantity, price },
      { new: true, runValidators: true }
    )

    if (!updatedItem) {
      res.status(404).json({ message: 'Purchase item not found' });
      return;
    }

    res.status(200).json({ message: 'Purchase item updated successfully', purchaseItem: updatedItem });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete PurchaseItem 
export const deletePurchaseItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await PurchaseItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: 'Purchase item not found' });
      return;
    }

    res.status(200).json({ message: 'Purchase item deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
