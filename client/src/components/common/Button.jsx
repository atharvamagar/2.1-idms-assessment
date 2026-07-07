import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
