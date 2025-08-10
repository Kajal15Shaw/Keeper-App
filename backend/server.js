import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//import path from 'path';
//import { fileURLToPath } from 'url';
import notesRouter from './routes/notes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
  credentials: true
}));

// API routes
app.use('/api/notes', notesRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));

/*// Serve static frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist'); // or 'build' depending on your Vite config

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});*/

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});