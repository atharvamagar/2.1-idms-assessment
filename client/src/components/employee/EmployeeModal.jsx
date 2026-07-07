import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import './EmployeeModal.css';

const emptyForm = {
  fullName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  department: '',
  designation: '',
};

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee, metaOptions }) => {
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(employee);

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setForm({
          fullName: employee.fullName || '',
          email: employee.email || '',
          phoneNumber: employee.phoneNumber || '',
          dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.slice(0, 10) : '',
          gender: employee.gender || '',
          department: employee.department || '',
          designation: employee.designation || '',
        });
        setPhotoPreview(
          employee.photoUrl
            ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${employee.photoUrl}`
            : null
        );
      } else {
        setForm(emptyForm);
        setPhotoPreview(null);
      }
      setPhoto(null);
      setErrors({});
    }
  }, [isOpen, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      errs.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    if (!form.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    if (!form.gender) errs.gender = 'Gender is required';
    if (!form.department) errs.department = 'Department is required';
    if (!form.designation) errs.designation = 'Designation is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (photo) formData.append('photo', photo);

      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Employee' : 'Create Employee'}
      width="800px"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="employee-form-grid">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={form.phoneNumber}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '');
              setForm((prev) => ({ ...prev, phoneNumber: digitsOnly }));
            }}
            error={errors.phoneNumber}
            required
          />
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
          />

          <div className="input-group">
            <label className="input-label" htmlFor="gender">
              Gender <span className="input-required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`input-field ${errors.gender ? 'input-field--error' : ''}`}
            >
              <option value="">Select gender</option>
              {metaOptions.genders?.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.gender && <span className="input-error-text">{errors.gender}</span>}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="department">
              Department <span className="input-required">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`input-field ${errors.department ? 'input-field--error' : ''}`}
            >
              <option value="">Select department</option>
              {metaOptions.departments?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && <span className="input-error-text">{errors.department}</span>}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="designation">
              Designation <span className="input-required">*</span>
            </label>
            <select
              id="designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className={`input-field ${errors.designation ? 'input-field--error' : ''}`}
            >
              <option value="">Select designation</option>
              {metaOptions.designations?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.designation && <span className="input-error-text">{errors.designation}</span>}
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="photo">
              Employee Photo
            </label>
            <div className="photo-upload-row">
              {photoPreview && <img src={photoPreview} alt="Preview" className="photo-preview" />}
              <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
          </div>
        </div>

        <div className="employee-form-actions">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeModal;
