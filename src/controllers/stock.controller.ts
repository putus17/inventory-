import { Request, Response } from 'express';
import Stock from '../models/Stock.model';
import { handleError } from '../utlis/auth.utlis';

// Create  stock 
export const createStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, warehouse, quantity } = req.body;

    if (!product || !warehouse || quantity == null) {
      res.status(400).json({ message: 'All fields are required: product, warehouse, quantity.' });
      return;
    }

    // Try find existing stock for product in warehouse
    let stock = await Stock.findOne({ product, warehouse });

    if (stock) {
      // Update existing stock quantity by adding quantity
      stock.quantity += quantity;
    } else {
      // Create new stock entry
      stock = new Stock({ product, warehouse, quantity });
    }

    // Prevent negative stock quantities
    if (stock.quantity < 0) {
      res.status(400).json({ message: 'Stock quantity cannot be negative.' });
      return;
    }

    await stock.save();

    res.status(201).json({ message: 'Stock updated successfully', stock });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all stock 
export const getAllStocks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stocks = await Stock.find()
      .populate('product warehouse')
      .sort({ product: 1 });

    res.status(200).json(stocks);
  } catch (error) {
    handleError(res, error);
  }
};

// Get stock by ID
export const getStockById = async (req: Request, res: Response): Promise<void> => {
  try {
    const stock = await Stock.findById(req.params.id).populate('product warehouse');

    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }

    res.status(200).json(stock);
  } catch (error) {
    handleError(res, error);
  }
};

// Update stock 
export const updateStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, warehouse, quantity } = req.body;

    if (!product || !warehouse || quantity == null) {
      res.status(400).json({ message: 'All fields are required: product, warehouse, quantity.' });
      return;
    }

    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      { product, warehouse, quantity },
      { new: true }
    )
    
    if (!updatedStock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }

    if (updatedStock.quantity < 0) {
      res.status(400).json({ message: 'Stock quantity cannot be negative.' });
      return;
    }

    res.status(200).json({ message: 'Stock updated successfully', stock: updatedStock });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete stock 
export const deleteStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);

    if (!deletedStock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }

    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
