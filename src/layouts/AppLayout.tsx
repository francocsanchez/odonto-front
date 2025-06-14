import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@components/Logo";
import NavMenu from "@components/NavMenu";
export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-52">
            <Logo />
          </div>
          <div className="mr-5">
            <NavMenu />
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

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
