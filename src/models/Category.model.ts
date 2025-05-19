import { ICategory } from './../types/inventory.d';
import { Schema, model } from 'mongoose'

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: String,
});

export default model<ICategory>('Category', CategorySchema);
