import { Link } from "react-router-dom";

export default function FormPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h1>Soporte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" />
        </div>

        <div>
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" rows="4"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
      <Link to={"/"} className="mt-4 text-blue-500">
        Volver al inicio
      </Link>
    </div>
  );
}
