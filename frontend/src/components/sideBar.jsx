import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  AlertTriangle,
  FileText,
  HelpCircle,
  Menu,
  X,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser, LogOut } from "../utils/apiCalls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../pages/loadingPage";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });

  const role = authUser?.data?.user?.status;

  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed lg:flex top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 z-50
        ${open ? "w-64" : "w-20 lg:w-64"}`}
      >
        <div className="p-4 flex flex-col">
          <button
            onClick={() => setOpen(!open)}
            className="self-center text-gray-500 hover:text-gray-800 lg:hidden cursor-pointer"
          >
            {open ? <X className="self-end" size={22} /> : <Menu size={22} />}
          </button>

          <h2 className="text-2xl font-bold text-blue-500 mt-2 mb-6 text-center">
            {open ? "AquaSense" : "AS"}
          </h2>

          <nav className="flex flex-col space-y-3">
            <Link
              to={`/${role}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white transition"
            >
              <LayoutDashboardIcon size={20} />
              {open && "Dashboard"}
            </Link>
            <Link
              to={`/${role}/education`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white transition"
            >
              <BookOpen size={20} />
              {open && "Education"}
            </Link>
            <Link
              to={`/${role}/hotspots`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white transition"
            >
              <AlertTriangle size={20} />
              {open && "Hotspots"}
            </Link>
            <Link
              to={`/${role}/reports`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white transition"
            >
              <FileText size={20} />
              {open && (role === "admin" ? "Reports" : "My Reports")}
            </Link>
            <Link
              to={`/${role}/help`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white transition"
            >
              <HelpCircle size={20} />
              {open && "Help"}
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition cursor-pointer"
          >
            <LogOutIcon size={20} />
            {open && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
