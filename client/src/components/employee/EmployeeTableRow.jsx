import './EmployeeTable.css';

const API_BASE = import.meta.env.VITE_API_URL.replace('/api', '');

const EmployeeTableRow = ({ employee, onEdit, onDelete }) => {
  return (
    <tr className="employee-row">
      <td>{employee.fullName}</td>
      <td>{employee.email}</td>
      <td>{employee.phoneNumber}</td>
      <td>{employee.gender}</td>
      <td>{new Date(employee.dateOfBirth).toLocaleDateString('en-GB')}</td>
      <td>{employee.department}</td>
      <td>{employee.designation}</td>
      <td>
        {employee.photoUrl ? (
          <a
            href={`${API_BASE}${employee.photoUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="employee-photo-clip"
            title="View photo"
          >
            📎
          </a>
        ) : (
          <span className="employee-photo-clip employee-photo-clip--empty">-</span>
        )}
      </td>
      <td>
        <div className="employee-actions">
          <button className="employee-action-btn" onClick={() => onEdit(employee)} title="Edit">
            ✎
          </button>
          <button
            className="employee-action-btn employee-action-btn--delete"
            onClick={() => onDelete(employee)}
            title="Delete"
          >
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
