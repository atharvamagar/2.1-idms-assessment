import './Input.css';

const Input = ({ label, type = 'text', name, value, onChange, error, required, ...rest }) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        {...rest}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
