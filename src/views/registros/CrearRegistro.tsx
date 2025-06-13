import { Link } from "react-router-dom";

export default function CrearRegistro() {
  return (
    <>
      <h1 className="text-3xl font-black uppercase">Nuevo registro</h1>
      <p className=" text-xl font-light text-gray-500 mt-2">Completa el formulario para registrar una atencion</p>

      <nav className="my-5">
        <Link to="/" className="bg-purple-400 hover:bg-purple-500 transition-colors px-10 py-3 text-white text-xl font-bold cursor-pointer">
          Volver a mis registros
        </Link>
      </nav>
    </>
  );
}
