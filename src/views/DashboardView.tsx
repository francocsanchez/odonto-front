import { Link } from "react-router-dom";
export default function DashboardView() {
  return (
    <>
      <h1 className="text-3xl font-black uppercase">Administracion</h1>
      <p className=" text-xl font-light text-gray-500 mt-2">Panel administrativo</p>

      <nav className="my-5">
        <Link
          to="/pacientes/create"
          className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl font-bold cursor-pointer"
        >
          Crear nuevo paciente
        </Link>
      </nav>
    </>
  );
}
