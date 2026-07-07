const mongoose = require('mongoose');

const DEPARTMENTS = ['Engineering', 'Design', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const DESIGNATIONS = ['Intern', 'Associate', 'Senior Associate', 'Team Lead', 'Manager', 'Director'];
const GENDERS = ['Male', 'Female', 'Other'];

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: GENDERS,
      required: [true, 'Gender is required'],
    },
    department: {
      type: String,
      enum: DEPARTMENTS,
      required: [true, 'Department is required'],
    },
    designation: {
      type: String,
      enum: DESIGNATIONS,
      required: [true, 'Designation is required'],
    },
    photoUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes for search performance
employeeSchema.index({ fullName: 'text', email: 'text' });
employeeSchema.index({ department: 1 });
employeeSchema.index({ designation: 1 });
employeeSchema.index({ gender: 1 });

module.exports = mongoose.model('Employee', employeeSchema);
module.exports.DEPARTMENTS = DEPARTMENTS;
module.exports.DESIGNATIONS = DESIGNATIONS;
module.exports.GENDERS = GENDERS;
