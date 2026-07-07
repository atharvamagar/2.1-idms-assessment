const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

const getEmployees = async (req, res, next) => {
  try {
    const { search, department, designation, gender, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
      ];
    }

    if (department) query.department = department;
    if (designation) query.designation = designation;
    if (gender) query.gender = gender;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [employees, total] = await Promise.all([
      Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Employee.countDocuments(query),
    ]);

    res.status(200).json({
      status: 'success',
      message: 'Employees fetched successfully',
      data: {
        employees,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum) || 1,
          totalRecords: total,
          limit: limitNum,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ status: 'error', message: 'Employee not found', data: null });
    }
    res.status(200).json({ status: 'success', message: 'Employee fetched', data: employee });
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, dateOfBirth, gender, department, designation } = req.body;

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const employee = await Employee.create({
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      department,
      designation,
      photoUrl,
    });

    res.status(201).json({
      status: 'success',
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(path.join(__dirname, '..', 'uploads', req.file.filename), () => {});
    }
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ status: 'error', message: 'Employee not found', data: null });
    }

    const updates = { ...req.body };

    if (req.file) {
      // Remove old photo file
      if (employee.photoUrl) {
        const oldPath = path.join(__dirname, '..', employee.photoUrl);
        fs.unlink(oldPath, () => {});
      }
      updates.photoUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Employee.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Employee updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ status: 'error', message: 'Employee not found', data: null });
    }

    if (employee.photoUrl) {
      const photoPath = path.join(__dirname, '..', employee.photoUrl);
      fs.unlink(photoPath, () => {});
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const getMetaOptions = (req, res) => {
  const { DEPARTMENTS, DESIGNATIONS, GENDERS } = require('../models/Employee');
  res.status(200).json({
    status: 'success',
    message: 'Meta options fetched',
    data: { departments: DEPARTMENTS, designations: DESIGNATIONS, genders: GENDERS },
  });
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMetaOptions,
};
