import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const emailRef = useRef(null);
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleUserChange = (e) => {
    setUser(e.target.value);
    setError({ ...error, user: false });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({ ...error, email: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: false });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError({ ...error, confirmPassword: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userRef.current.value.length) {
      setError({ ...error, user: true });
      userRef.current.focus();
      return;
    }

    if (!emailRef.current.value.length) {
      setError({ ...error, email: true });
      emailRef.current.focus();
      return;
    }

    if (!passwordRef.current.value.length) {
      setError({ ...error, password: true });
      passwordRef.current.focus();
      return;
    }
    if (!confirmPasswordRef.current.value.length) {
      setError({ ...error, confirmPassword: true });
      confirmPasswordRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setError({ ...error, password: true, confirmPassword: true });
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
      .then((res) => res.json())
      .then(() => {
        console.log("Login exitoso");
        navigate("/perfil");
      })
      .catch((err) => {
        console.error("Error en el login", err);
      });
  };

  return (
    <main className="min-h-screen text-white pt-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Registrate!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-96 flex flex-col items-center bg-[#040404] p-10 gap-4 h-auto rounded-lg mt-5"
      >
        <div className="flex gap-2 flex-col w-full">
          <label htmlFor="nombre">Usuario</label>
          <input
            type="text"
            name="user"
            ref={userRef}
            value={user}
            onChange={handleUserChange}
            placeholder="Ingrese su usuario"
            className="p-2 w-full bg-white text-black"
          />
          {error.user && (
            <span className="text-red-500">
              El campo de usuario es obligatorio
            </span>
          )}
        </div>

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
          Acceder
        </button>
      </form>
    </main>
  );
}
