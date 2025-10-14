import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../auth.services";
import { useContext } from "react";
import { AuthContext } from "../../../services/auth/auth.context";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(AuthContext);

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRef.current.value.length || !validateEmail(email)) {
      setError({ ...error, email: true });
      emailRef.current.focus();
      return;
    }

    if (
      !passwordRef.current.value.length ||
      !validatePassword(password, 7, null, true, true)
    ) {
      setError({ ...error, password: true });
      passwordRef.current.focus();
      return;
    }

    setError({ email: false, password: false });

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((token) => {
        handleUserLogin(token);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
        console.error("Error en el login", err);
      });
  };

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Iniciar Sesión!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-96 flex flex-col items-center bg-[#040404] p-10 gap-4 h-auto rounded-lg mt-5"
      >
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="nombre">Email</label>
          <input
            type="email"
            name="user"
            ref={emailRef}
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su email"
            className="p-2 w-full bg-white text-black"
          />
          {error.email && (
            <span className="text-red-500">El campo email es obligatorio</span>
          )}
        </div>

        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingrese su contraseña"
            className="p-2 w-full bg-white text-black"
          />
          {error.password && (
            <span className="text-red-500">
              El campo contraseña es obligatorio
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#7c00e2] text-white py-2 px-4 rounded-lg"
        >
          Acceder
        </button>
        <Link to="/register" className="mt-4 text-sm underline text-white">
          No tenes cuenta? Registrate
        </Link>
      </form>
    </main>
  );
}
