import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Purchase from '../models/Purchase.model';
import { handleError } from '../utlis/auth.utlis';

const { isValidObjectId } = mongoose;

// Create a new purchase
export const createPurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const { supplier, date, totalAmount, status } = req.body;

        // Validate required fields
        if (!supplier) {
            res.status(400).json({ message: 'Supplier, totalAmount, and status are required.' });
            return;
        }

        const newPurchase = new Purchase({
            supplier,
            date: date || new Date(),  // If no date is provided, use the current date
            totalAmount,
            status,
        });

        await newPurchase.save();
        res.status(201).json({ message: 'Purchase created successfully.', purchase: newPurchase });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all purchases
export const getAllPurchases = async (_req: Request, res: Response): Promise<void> => {
    try {
        const purchases = await Purchase.find()
           

        res.status(200).json(purchases);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a purchase by ID
export const getPurchaseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid purchase ID.' });
        return;
    }

    try {
        const purchase = await Purchase.findById(id);

        if (!purchase) {
            res.status(404).json({ message: 'Purchase not found.' });
            return;
        }

        res.status(200).json(purchase);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a purchase
export const updatePurchase = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { supplier, date, totalAmount, status } = req.body;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid purchase ID.' });
        return;
    }

    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            id,
            { supplier, date, totalAmount, status },
            { new: true, runValidators: true }
        );

        if (!updatedPurchase) {
            res.status(404).json({ message: 'Purchase not found.' });
            return;
        }

        res.status(200).json({ message: 'Purchase updated successfully.', purchase: updatedPurchase });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a purchase
export const deletePurchase = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid purchase ID.' });
        return;
    }

    try {
        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletedPurchase) {
            res.status(404).json({ message: 'Purchase not found.' });
            return;
        }

        res.status(200).json({ message: 'Purchase deleted successfully.' });
    } catch (error) {
        handleError(res, error);
    }
};
