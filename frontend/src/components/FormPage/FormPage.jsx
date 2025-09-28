import { Link } from "react-router-dom";
import { useRef } from "react";
export default function FormPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (nombreRef.current) {
      console.log("Nombre:", nombreRef.current.value);
    }
    if (emailRef.current) {
      console.log("Email:", emailRef.current.value);
    }
    if (mensajeRef.current) {
      console.log("Mensaje:", mensajeRef.current.value);
    }
  };

  const [error, setError] = useState({
    nombre: false,
    email: false,
    mensaje: false
  });

  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const mensajeRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-2xl font-bold">Soporte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col" >

        <div className="mb-4 flex flex-col">
          <label htmlFor="name" className="text-lg font-medium mb-1">Nombre:</label>
          <input
            type="text"
            id="name"
            ref={nombreRef}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>


        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="text-lg font-medium mb-1">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c00e2] transition"
          />
        </div>


        <div className="mb-4 flex flex-col">
          <label htmlFor="message" className="text-lg font-medium mb-1">Mensaje:</label>
          <textarea
            id="message"
            rows="4"
            ref={mensajeRef}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c00e2] transition resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#7c00e2] hover:bg-[#6a00c4] text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Enviar
        </button>
      </form>
      <Link to={"/"} className="mt-4 text-blue-500">
        Volver al inicio
      </Link>
    </div>
  );
}
