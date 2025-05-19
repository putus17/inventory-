import { Request, Response } from 'express';
import Supplier from '../models/Supplier.model';
import { handleError } from '../utlis/auth.utlis';


// Get all suppliers
export const getAllSuppliers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        handleError(res, error);
    }
};

// Get supplier by ID
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            res.status(404).json({ message: 'Supplier not found.' });
            return;
        }
        res.status(200).json(supplier);
    } catch (error) {
        handleError(res, error);
    }
};

// Create a new supplier
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, contactInfo, address } = req.body;

        if (!name || !contactInfo || !address) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const supplier = await Supplier.create({ name, contactInfo, address });

        res.status(201).json({ message: 'Supplier created successfully', supplier });
    } catch (error) {
        handleError(res, error);
    }
};

// Update supplier details
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, contactInfo, address } = req.body;

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { name, contactInfo, address },
            { new: true, runValidators: true }
        );

        if (!updatedSupplier) {
            res.status(404).json({ message: 'Supplier not found.' });
            return;
        }

        res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) {
            res.status(404).json({ message: 'Supplier not found.' });
            return;
        }

        res.status(200).json({ message: 'Supplier deleted successfully.' });
    } catch (error) {
        handleError(res, error);
    }
};
