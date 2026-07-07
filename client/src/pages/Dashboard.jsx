import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as employeeService from '../services/employeeService';
import EmployeeTable from '../components/employee/EmployeeTable';
import EmployeeModal from '../components/employee/EmployeeModal';
import SearchFilterBar from '../components/employee/SearchFilterBar';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Sidebar from '../components/layout/Sidebar';
import TopHeader from '../components/layout/TopHeader';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0 });
  const [filters, setFilters] = useState({ search: '', department: '', designation: '', gender: '', page: 1, limit: 10 });
  const [metaOptions, setMetaOptions] = useState({ departments: [], designations: [], genders: [] });
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await employeeService.getEmployees(filters);
      setEmployees(res.data.employees);
      setPagination(res.data.pagination);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    employeeService.getMetaOptions().then((res) => setMetaOptions(res.data));
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleCreateClick = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await employeeService.updateEmployee(editingEmployee._id, formData);
        showToast('Employee updated successfully', 'success');
      } else {
        await employeeService.createEmployee(formData);
        showToast('Employee created successfully', 'success');
      }
      setModalOpen(false);
      fetchEmployees();
    } catch (err) {
      showToast(err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await employeeService.deleteEmployee(deleteTarget._id);
      showToast('Employee deleted successfully', 'success');
      setDeleteTarget(null);
      fetchEmployees();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete employee', 'error');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <TopHeader onLogout={handleLogout} />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-page-header">
            <h1 className="dashboard-title">Employee Setup</h1>
          </div>
          <main className="dashboard-main">
            <div className="dashboard-toolbar">
              <SearchFilterBar filters={filters} onFilterChange={setFilters} metaOptions={metaOptions} />
              <Button onClick={handleCreateClick}>+ Create</Button>
            </div>
            {loading ? (
              <div className="dashboard-loading">Loading employees...</div>
            ) : (
              <>
                <EmployeeTable employees={employees} onEdit={handleEditClick} onDelete={setDeleteTarget} />
                <div className="dashboard-footer">
                  <span className="dashboard-total-records">Total Records -&gt; {pagination.totalRecords}</span>
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <EmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        employee={editingEmployee}
        metaOptions={metaOptions}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deleteTarget?.fullName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;
