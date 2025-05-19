import { Schema, model } from 'mongoose';
import { ISale } from '../types/inventory.d';


const SaleSchema = new Schema<ISale>({
  customer: String,
  date: { type: Date, default: Date.now },
  totalAmount:{ type: Number},
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
});

export default model<ISale>('Sale', SaleSchema);
