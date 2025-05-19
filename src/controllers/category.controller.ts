import { Request, Response } from 'express';
import Category from '../models/Category.model';
import { handleError } from '../utlis/auth.utlis';



// Get all categories
export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find().lean();
        res.status(200).json(categories);
    } catch (error) {
        handleError(res, error);
    }
};
// Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).lean();
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        handleError(res, error);
    }
};

// Create category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        const existing = await Category.findOne({ name }).lean();
        if (existing) {
            res.status(400).json({ message: 'Category name already exists' });
            return;
        }

        const newCategory = await Category.create({ name, description });
        res.status(201).json({ message: 'Category created', category: newCategory });
    } catch (error) {
        handleError(res, error);
    }
};


// update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        ).lean();

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json({ message: 'Category updated', category });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id).lean();
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        handleError(res, error);
    }
}

