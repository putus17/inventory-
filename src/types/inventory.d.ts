import {  Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  passwordHash: string;
}

export interface ICategory extends Document {
  name: string;
  description: string;
}


export interface IProduct extends Document {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface ISale extends Document {
  customer: string;
  date: Date;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface IPurchase extends Document {
  supplier: Types.ObjectId;
  date: Date;
  totalAmount: number;
  status: 'pending' | 'received' | 'cancelled';
}

export interface IWarehouse extends Document {
  name: string;
  location: string;
  capacity: number;
}

export interface ISupplier extends Document {
  name: string;
  contactInfo: string;
  address: string;
}

export interface IStockMovement extends Document {
  product: Types.ObjectId;
  source: Types.ObjectId;
  destination: Types.ObjectId;
  quantity: number;
  date: Date;
}
export interface IStock extends Document {
  product: Types.ObjectId;
  warehouse: Types.ObjectId;
  quantity: number;
}
export interface ISaleItem extends Document {
  sale: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IPurchaseItem extends Document {
  purchase: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
    }
  }
}

export type CustomJwtPayload = {
  userid: string;
  email: string;
  role: string;
};