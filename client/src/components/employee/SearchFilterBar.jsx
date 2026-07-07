import './SearchFilterBar.css';

const SearchFilterBar = ({ filters, onFilterChange, metaOptions }) => {
  return (
    <div className="search-filter-bar">
      <div className="search-input-wrapper">
        <span className="search-input-icon">&#128269;</span>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value, page: 1 })}
        />
      </div>

      <select
        className="filter-select"
        value={filters.department}
        onChange={(e) => onFilterChange({ ...filters, department: e.target.value, page: 1 })}
      >
        <option value="">All Departments</option>
        {metaOptions.departments?.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.designation}
        onChange={(e) => onFilterChange({ ...filters, designation: e.target.value, page: 1 })}
      >
        <option value="">All Designations</option>
        {metaOptions.designations?.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.gender}
        onChange={(e) => onFilterChange({ ...filters, gender: e.target.value, page: 1 })}
      >
        <option value="">All Genders</option>
        {metaOptions.genders?.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilterBar;
