import { useState } from "react";
import { Area } from "../../components/Area/Area";

export default function CheckoutPage() {
  const [area, setArea] = useState("");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Confirmacion de entrada</h1>
      <section className="flex flex-col md:flex-row items-center">
        <Area area={area} setArea={setArea} />
        <div className="flex flex-col text-black items-center text-2xl gap-8">
          {area === "" && (
            <span className="text-red-600 text-3xl font-semibold ">
              Por favor selecciona un sector
            </span>
          )}

          <span className="text-3xl font-semibold ">{area}</span>

          {area && (
            <button className="text-white bg-black px-4 py-2 rounded-lg hover:bg-fuchsia-950 transition">
              Confirmar compra
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
