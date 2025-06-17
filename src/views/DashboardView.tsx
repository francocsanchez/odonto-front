import { Link } from "react-router-dom";
import { UserGroupIcon, ClipboardDocumentListIcon, UserPlusIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function DashboardView() {
  const sections = [
    {
      title: "Pacientes",
      icon: <UserGroupIcon className="h-10 w-10 text-purple-600" />,
      to: "/pacientes",
    },
    {
      title: "Obras Sociales",
      icon: <BuildingOffice2Icon className="h-10 w-10 text-purple-600" />,
      to: "/obras-sociales",
    },
    {
      title: "Códigos",
      icon: <ClipboardDocumentListIcon className="h-10 w-10 text-purple-600" />,
      to: "/codigos",
    },
    {
      title: "Usuarios",
      icon: <UserPlusIcon className="h-10 w-10 text-purple-600" />,
      to: "/usuarios",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-black uppercase">Administración</h1>
      <p className="text-xl font-light text-gray-500 mt-2">Panel administrativo</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {sections.map((section) => (
          <Link
            to={section.to}
            key={section.title}
            className="bg-white border border-gray-200 hover:shadow-lg transition-shadow rounded-2xl p-6 flex flex-col items-center text-center shadow-sm group"
          >
            <div className="mb-4">{section.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-purple-600">{section.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
