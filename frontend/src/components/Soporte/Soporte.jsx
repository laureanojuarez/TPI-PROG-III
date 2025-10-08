export const Soporte = () => {
  return (
    <>
      <div className="bg-[url('https://billboard.ar/wp-content/uploads/2025/03/6769d56f16bec8fc4c4c3782_arb_dia1__mazza.ph-01164-1-scaled.jpeg')] w-full h-[800px] flex items-center justify-center gap-20">
        <div className="max-w-md w-full h-[500px] p-6 bg-white/10 border border-white/20 rounded-xl shadow-lg backdrop-blur-md text-white flex flex-col justify-between items-center gap-5">
          <h2 className="font-bold text-2xl w-full">
            ¿Tuviste algún inconveniente? ¡Contactanos!
          </h2>
          <textarea
            placeholder="Tu consulta..."
            className="w-full h-60 p-3 rounded-lg bg-white/10 border border-white/20 text-white text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#7c00e2] focus:bg-white/20"
          />
          <button className="self-end px-6 py-2 bg-[#7c00e2] text-white rounded-xl hover:bg-[#7c00e2] transition-colors m-[auto]">
            Enviar!
          </button>
        </div>
        <div className="max-w-md w-full h-[500px] p-6 bg-white/10 border border-white/20 rounded-xl shadow-lg backdrop-blur-md text-white space-y-4 flex justify-center flex-col items-center">
          <h2 className="font-bold text-[24px] text-white">
            Preguntas Frecuentes!
          </h2>
          <div className="bg-white-/6 backdrop-blur-md rounded-xl p-5 flex flex-col gap-5">
            <span className="hover:bg-white/20 transition-all duration-300 hover:scale-105 p-3 rounded-xl cursor-pointer">
              ¿Como autorizo a un tercero a usar mis entradas?
            </span>
            <span className="hover:bg-white/20 transition-all duration-300 hover:scale-105 p-3 rounded-xl cursor-pointer">
              ¿Cuándo me envian el QR?
            </span>
          </div>
          <p className="m-auto text-xl text-bold">Más respuestas abajo!</p>
        </div>
      </div>

      <div className="w-full  mx-auto bg-white h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Cómo comprar en Evento Pass?
          </h4>
          <p>
            Puedes comprar desde nuestra web o en puntos físicos habilitados.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Qué métodos de pago aceptan?
          </h4>
          <p>
            Aceptamos tarjetas de crédito, débito, Mercado Pago y transferencias
            bancarias.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Puedo devolver mi entrada?
          </h4>
          <p>
            Las devoluciones están sujetas a la política del evento. Consultá
            los términos antes de comprar.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Cómo recibo mi entrada?
          </h4>
          <p>
            Te enviamos un código QR por mail. También podés descargarla desde
            tu perfil.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Qué pasa si pierdo el QR?
          </h4>
          <p>
            Podés recuperarlo iniciando sesión en tu cuenta o contactando
            soporte.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-2 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 ">
          <h4 className="font-bold text-[20px] text-black">
            ¿Hay descuentos disponibles?
          </h4>
          <p>
            Algunos eventos tienen descuentos. Revisá la sección de beneficios.
          </p>
        </div>
      </div>
    </>
  );
};
