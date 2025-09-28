import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login({onLogin}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError({...error, email: false});
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError({...error, password: false});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    onLogin();
    navigate("/perfil");
  };

  return (
    <main className="min-h-screen text-white pt-10 flex flex-col items-center justify-center">
      <h1>Iniciar Sesion</h1>
      <form onSubmit={handleSubmit} className="w-96 flex flex-col items-center">
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

        <button type="submit">Acceder</button>
      </form>
    </main>
  );
}
