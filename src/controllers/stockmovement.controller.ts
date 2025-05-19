import { Request, Response } from 'express';
import StockMovement from '../models/StockMovement.model';
import { handleError } from '../utlis/auth.utlis';



// Get by ID
export const getStockMovementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movement = await StockMovement.findById(req.params.id).populate('product source destination');

    if (!movement) {
      res.status(404).json({ message: 'Movement not found' });
      return;
    }

    res.status(200).json(movement);
  } catch (error) {
    handleError(res, error);
  }
};

// Create stock movement
export const createStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, source, destination, quantity, date } = req.body;

    if (!product || !source || !destination || !quantity) {
      res.status(400).json({ message: 'All fields are required: product, source, destination, quantity.' });
      return;
    }

    const movement = await StockMovement.create({
      product,
      source,
      destination,
      quantity,
      date: date || new Date()
    });

    res.status(201).json({ message: 'Stock moved successfully', movement });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all stock movements
export const getAllStockMovements = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movements = await StockMovement.find()
      .populate('product source destination')
      .sort({ createdAt: -1 });

    res.status(200).json(movements);
  } catch (error) {
    handleError(res, error);
  }
};

// Update stock movement by ID
export const updateStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { product, source, destination, quantity, date } = req.body;

    if (!product || !source || !destination || !quantity) {
      res.status(400).json({ message: 'All fields are required: product, source, destination, quantity.' });
      return;
    }

    const updatedMovement = await StockMovement.findByIdAndUpdate(
      id,
      { product, source, destination, quantity, date },
      { new: true, runValidators: true }
    ).populate('product source destination');

    if (!updatedMovement) {
      res.status(404).json({ message: 'Movement not found.' });
      return;
    }

    res.status(200).json({ message: 'Stock movement updated successfully', updatedMovement });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete movement
export const deleteStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await StockMovement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: 'Movement not found' });
      return;
    }

    res.status(200).json({ message: 'Movement deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
