import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('BUK Certify Backend Running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
