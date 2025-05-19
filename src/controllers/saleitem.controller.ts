import { Request, Response } from 'express';
import SaleItem from '../models/SaleItem.model';
import { handleError } from '../utlis/auth.utlis';

// Create a Sale Item
export const createSaleItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sale, product, quantity, price } = req.body;

    if (!sale || !product || quantity == null || price == null) {
      res.status(400).json({ message: 'All fields are required: sale, product, quantity, price.' });
      return;
    }

    const item = await SaleItem.create({ sale, product, quantity, price });

    res.status(201).json({ message: 'Sale item created successfully', item });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all sale items
export const getAllSaleItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await SaleItem.find().populate('sale product').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    handleError(res, error);
  }
};

// Get single sale item
export const getSaleItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await SaleItem.findById(req.params.id).populate('sale product');

    if (!item) {
      res.status(404).json({ message: 'Sale item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    handleError(res, error);
  }
};

// Update sale item
export const updateSaleItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sale, product, quantity, price } = req.body;

    const updated = await SaleItem.findByIdAndUpdate(
      req.params.id,
      { sale, product, quantity, price },
      { new: true, runValidators: true }
    )

    if (!updated) {
      res.status(404).json({ message: 'Sale item not found' });
      return;
    }

    res.status(200).json({ message: 'Sale item updated', item: updated });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete sale item
export const deleteSaleItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await SaleItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: 'Sale item not found' });
      return;
    }

    res.status(200).json({ message: 'Sale item deleted' });
  } catch (error) {
    handleError(res, error);
  }
};
