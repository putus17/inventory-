import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse.model';
import { handleError } from '../utlis/auth.utlis';

// Create a new warehouse
export const createWarehouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, location, capacity } = req.body;

        if (!name || !location || !capacity) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const warehouse = await Warehouse.create({ name, location, capacity });

        res.status(201).json({ message: 'Warehouse created successfully', warehouse });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all warehouses
export const getAllWarehouses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        handleError(res, error);
    }
};

// Get warehouse by ID
export const getWarehouseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const warehouse = await Warehouse.findById(id);
        if (!warehouse) {
            res.status(404).json({ message: 'Warehouse not found.' });
            return;
        }
        res.status(200).json(warehouse);
    } catch (error) {
        handleError(res, error);
    }
};

// Update warehouse details
export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, location, capacity } = req.body;

    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(
            id,
            { name, location, capacity },
            { new: true, runValidators: true }
        );

        if (!updatedWarehouse) {
            res.status(404).json({ message: 'Warehouse not found.' });
            return;
        }

        res.status(200).json({ message: 'Warehouse updated successfully', warehouse: updatedWarehouse });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a warehouse
export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedWarehouse = await Warehouse.findByIdAndDelete(id);
        if (!deletedWarehouse) {
            res.status(404).json({ message: 'Warehouse not found.' });
            return;
        }

        res.status(200).json({ message: 'Warehouse deleted successfully.' });
    } catch (error) {
        handleError(res, error);
    }
};
