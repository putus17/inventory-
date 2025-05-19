import express, { Express} from 'express';
import cors from 'cors'
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import SaleRoutes from './routes/sale.routes';
import ProductRoutes from './routes/product.routes';
import purchaseRoutes from './routes/purchase.routes';
 import warehouseRoutes from './routes/warehouse.routes';
import supplierRoutes from './routes/supplier.routes';
import stockmovementRoutes from './routes/stockmovement.routes';
import stockRoutes from './routes/stock.routes';
import SaleItemRoutes from './routes/saleitem.routes';
import purchaseItemRoutes from './routes/purchaseitem.routes';
import authRoutes from './routes/auth.routes';

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/sales', SaleRoutes)
app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/purchases', purchaseRoutes);
 app.use('/api/v1/warehouses', warehouseRoutes);
 app.use('/api/v1/supplier', supplierRoutes);
 app.use('/api/v1/stockmovement', stockmovementRoutes);
 app.use('/api/v1/stock', stockRoutes);
 app.use('/api/v1/saleitem', SaleItemRoutes);
 app.use('/api/v1/purchaseitem', purchaseItemRoutes);
 


// Root route
app.get('/', (_req, res) => {
  res.send(
    `
    
    Status: Online
    Uptime: ${Math.floor(process.uptime())} seconds
        `);
    });

     export default app;