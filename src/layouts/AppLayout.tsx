import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@components/Logo";
import NavMenu from "@components/NavMenu";
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-5">
          <div className="w-52">
            <Link to={"/"} className=" cursor-pointer">
              <Logo />
            </Link>
          </div>
          <div className="mr-5">
            <NavMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-screen-2xl mx-auto mt-2 p-5">
          <Outlet />
        </div>
      </main>

      <footer className="py-5 bg-gray-800 text-white mt-2">
        <div className="max-w-screen-2xl mx-auto text-center px-5">
          <p className="text-sm">Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
