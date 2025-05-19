import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Sale from '../models/Sale.model';
import { handleError } from '../utlis/auth.utlis';

const { isValidObjectId } = mongoose;

// Create a new sale
export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerId, productId, quantity, totalPrice ,status} = req.body;

        const sale = await Sale.create({ customerId, productId, quantity, totalPrice,status });
        res.status(201).json({ message: 'Sale created successfully.', sale });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all sales
export const getAllSales = async (_req: Request, res: Response): Promise<void> => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a sale by ID
export const getSaleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid sale ID.' });
        return;
    }

    try {
        const sale = await Sale.findById(id);
        if (!sale) {
            res.status(404).json({ message: 'Sale not found.' });
            return;
        }

        res.status(200).json(sale);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a sale
export const updateSale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { customerId, productId, quantity, totalPrice } = req.body;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid sale ID.' });
        return;
    }

    try {
        const updatedSale = await Sale.findByIdAndUpdate(
            id,
            { customerId, productId, quantity, totalPrice },
            { new: true, runValidators: true }
        );

        if (!updatedSale) {
            res.status(404).json({ message: 'Sale not found.' });
            return;
        }

        res.status(200).json({ message: 'Sale updated successfully.', sale: updatedSale });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a sale
export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid sale ID.' });
        return;
    }

    try {
        const deletedSale = await Sale.findByIdAndDelete(id);
        if (!deletedSale) {
            res.status(404).json({ message: 'Sale not found.' });
            return;
        }

        res.status(200).json({ message: 'Sale deleted successfully.' });
    } catch (error) {
        handleError(res, error);
    }
};
