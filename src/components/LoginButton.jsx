// src/components/LoginButton.jsx
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleLoginClick}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md transition duration-300"
    >
      Login
    </button>
  );
};

export default LoginButton;
