import { Request, Response } from 'express';
import Product from '../models/Product.model';
import { handleError, isValidObjectId } from '../utlis/auth.utlis'
import { IProduct } from '../types/inventory';


// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
    } catch (error) {
        handleError(res, error);  // Handle error
    }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    // Validate ObjectId
    if (!isValidObjectId(productId, res)) return;

    try {
        const product = await Product.findById(productId).lean();
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        handleError(res, error);  // Handle error
    }
};

// Create product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, sku, price, quantity } = req.body;

        // Check if product with the same SKU already exists
        const existingProduct = await Product.find({ sku }).lean();
        if (existingProduct.length > 0) {
            res.status(400).json({ message: 'Product SKU already exists' });
            return;
        }

        // Create the new product
        const newProduct = await Product.create({ name, description, sku, price, quantity });
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        handleError(res, error);  // Handle error
    }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, sku, price, quantity } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id, res)) return;

    // Ensure at least one field is provided for updating
    if (!name && !description && !sku && !price && !quantity) {
        res.status(400).json({ message: "No update fields provided" });
        return;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, sku, price, quantity },
            { new: true }
        ).lean();

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        handleError(res, error);  // Handle error
    }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id, res)) return;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id).lean();
        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        handleError(res, error); 
    }
};
