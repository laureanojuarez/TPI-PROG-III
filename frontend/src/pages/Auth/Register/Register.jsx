import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateRegisterUser} from "../auth.services";

export default function Register() {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleUserChange = (e) => {
    setUser(e.target.value);
    setError({...error, username: false});
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({...error, email: false});
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({...error, password: false});
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError({...error, confirmPassword: false});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateRegisterUser({
      username,
      email,
      password,
      confirmPassword,
    });

    if (validation.error) {
      setRegisterError(validation.message);
      return;
    }

    setRegisterError("");

    if (!usernameRef.current.value.length) {
      setError({...error, username: true});
      usernameRef.current.focus();
      return;
    }

    if (!emailRef.current.value.length) {
      setError({...error, email: true});
      emailRef.current.focus();
      return;
    }

    if (!passwordRef.current.value.length) {
      setError({...error, password: true});
      passwordRef.current.focus();
      return;
    }
    if (!confirmPasswordRef.current.value.length) {
      setError((error) => ({...error, password: true, confirmPassword: true}));
      confirmPasswordRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setError({...error, password: true, confirmPassword: true});
      passwordRef.current.focus();
      return;
    }

    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error en el registro");
        }

        return res.json();
      })
      .then(() => {
        console.log("Usuario creado exitosamente");
        navigate("/");
      })
      .catch((err) => {
        setRegisterError(err.message);
        console.error("Error en el login", err);
      });
  };
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Registrate!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-96 flex flex-col items-center bg-[#040404] p-10 gap-4 h-auto rounded-lg mt-5"
      >
        {registerError && (
          <div className="w-full mb-2 text-center text-red-500 font-semibold">
            {registerError}
          </div>
        )}
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="nombre">Usuario</label>
          <input
            type="text"
            name="username"
            ref={usernameRef}
            value={username}
            onChange={handleUserChange}
            placeholder="Ingrese su usuario"
            className="p-2 w-full bg-white text-black"
          />
          {error.username && (
            <span className="text-red-500">
              El campo de usuario es obligatorio
            </span>
          )}
        </div>

        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="nombre">Email</label>
          <input
            type="email"
            name="email"
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
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="password">Confirmar contraseña</label>
          <input
            type="password"
            name="password"
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Ingrese su contraseña"
            className="p-2 w-full bg-white text-black"
          />
          {error.confirmPassword && (
            <span className="text-red-500">
              El campo confirmar contraseña es obligatorio
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#7c00e2] text-white py-2 px-4 rounded-lg"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
