import mongoose, { Connection } from "mongoose";

const connectDB = async () => {
  try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        console.log(
            `Connection State: ${
                mongoose.connection.readyState === 1 
                ? "Connected" 
                : "Disconnected"
            }`
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error(`Error: ${String(error)}`);
        }
        console.error(`Database Connection Failed`);
        process.exit(1);
      }
}
export default connectDB;

  