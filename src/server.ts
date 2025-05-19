import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

// Load environment variables from .env file
dotenv.config()

// Connect to the database
connectDB()

// Start the server
const PORT = process.env.PORT || 3000   
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})