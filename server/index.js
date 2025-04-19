import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { AttendanceModel } from './models/attendance.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all attendance records
app.get('/api/attendance', async (req, res) => {
  try {
    const { subject } = req.query;
    const query = subject ? { subject } : {};
    const records = await AttendanceModel.find(query).sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { usn, subject } = req.body;
    
    // Check for duplicate attendance
    const existingRecord = await AttendanceModel.findOne({
      usn,
      subject,
      timestamp: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
      }
    });

    if (existingRecord) {
      return res.status(400).json({ error: 'Attendance already marked for this subject today' });
    }

    const attendance = new AttendanceModel({
      usn,
      subject,
      timestamp: new Date()
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});