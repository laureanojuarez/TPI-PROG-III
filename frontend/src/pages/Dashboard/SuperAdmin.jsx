export const SuperAdmin = ({ data }) => {
  return (
    <div className="min-h-screen w-full">
      <h2 className="text-white">Gestioná los Administradores</h2>

      <div>
        {data.map((e) => {
          <li>
            <h4>{e.userName}</h4>
            <p>{e.email}</p>
            <button>Editar</button>
            <button>Quitar Admin</button>
          </li>;
        })}
      </div>
    </div>
  );
};
