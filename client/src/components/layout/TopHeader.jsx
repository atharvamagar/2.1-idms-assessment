import './TopHeader.css';
import idmsLogo from '../../assets/icons/idms_logo.svg';
import userAvatar from '../../assets/icons/user_avatar.svg';

const TopHeader = ({ onLogout }) => {
  return (
    <header className="top-header">
      <div className="top-header-left">
        <img src={idmsLogo} alt="IDMS" className="top-header-logo" />
        <span className="top-header-divider" />
      </div>
      <button className="top-header-profile" onClick={onLogout} title="Logout" aria-label="Logout">
        <img src={userAvatar} alt="User profile" className="top-header-avatar" />
      </button>
    </header>
  );
};

export default TopHeader;