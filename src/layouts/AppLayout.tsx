import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-52">
            <Logo />
          </div>
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-2 p-5">
        <Outlet />
      </section>

      <footer className="py-5 bg-gray-800 text-white">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-sm">Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
