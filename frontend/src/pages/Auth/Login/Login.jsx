import {useNavigate} from "react-router-dom";

export default function Login({onLogin}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) onLogin();
    navigate("/perfil");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </div>
  );
}
