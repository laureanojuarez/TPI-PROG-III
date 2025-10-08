import { useState } from "react";
import { Area } from "../../components/Area/Area";

export default function CheckoutPage() {
  const [area, setArea] = useState("");
  return (
    <div className="bg-gray-100 ">
      <main className="min-h-screen flex flex-col w-full h-full justify-center items-center gap-12">
        <h1 className="text-2xl font-bold   pl-4">Confirmacion de entrada</h1>
        <section className="flex flex-wrap justify-center items-center">
          <Area area={area} setArea={setArea} />
          {area === "" && (
            <span className="text-red-600 text-2xl font-semibold ">
              Por favor selecciona un sector
            </span>
          )}

          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="text-3xl font-semibold ">{area}</span>

            {area && (
              <button className="text-stone-950 px-4 rounded-md hover:border-b transition-all transform hover:scale-105">
                Confirmar compra
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
