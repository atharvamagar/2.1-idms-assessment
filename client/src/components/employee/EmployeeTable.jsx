import EmployeeTableRow from './EmployeeTableRow';
import noRecordsIcon from '../../assets/icons/no_records.svg';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="employee-table-empty">
        <img src={noRecordsIcon} alt="No records" className="employee-table-empty-icon" />
        <p>No Records to be displayed</p>
        <span>Try adjusting your search or filters, or create a new employee.</span>
      </div>
    );
  }

  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <EmployeeTableRow key={emp._id} employee={emp} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;