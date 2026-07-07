import './Sidebar.css';

import employeeIcon from '../../assets/icons/employee.svg';
import leavesIcon from '../../assets/icons/leaves.svg';
import holidaysIcon from '../../assets/icons/holidays.svg';
import outdoorDutyIcon from '../../assets/icons/outdoor_duty.svg';
import expenseIcon from '../../assets/icons/expense.svg';
import attendanceIcon from '../../assets/icons/attendance.svg';
import itComputationIcon from '../../assets/icons/it_computation.svg';
import salaryIcon from '../../assets/icons/salary.svg';
import documentsIcon from '../../assets/icons/documents.svg';
import trainingDevIcon from '../../assets/icons/training.svg';
import performanceIcon from '../../assets/icons/performance.svg';
import hrPoliciesIcon from '../../assets/icons/policies.svg';
import reportsIcon from '../../assets/icons/reports.svg';
import supportIcon from '../../assets/icons/support.svg';

const NAV_ITEMS = [
  { label: 'Employee', icon: employeeIcon, active: true },
  { label: 'Leaves', icon: leavesIcon },
  { label: 'Holidays', icon: holidaysIcon },
  { label: 'Outdoor Duty', icon: outdoorDutyIcon },
  { label: 'Expense', icon: expenseIcon },
  { label: 'Attendance', icon: attendanceIcon },
  { label: 'IT Computation', icon: itComputationIcon },
  { label: 'Salary', icon: salaryIcon },
  { label: 'Documents', icon: documentsIcon },
  { label: 'Training & Dev.', icon: trainingDevIcon },
  { label: 'Performance', icon: performanceIcon },
  { label: 'HR Policies', icon: hrPoliciesIcon },
  { label: 'Reports', icon: reportsIcon },
  { label: 'Support', icon: supportIcon },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${item.active ? 'sidebar-item--active' : ''}`}
          >
            <img src={item.icon} alt={item.label} className="sidebar-icon" />
            <span className="sidebar-divider" />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;