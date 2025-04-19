import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ['FSD', 'ML', 'CC', 'SEC', 'WC']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const AttendanceModel = mongoose.model('Attendance', attendanceSchema);