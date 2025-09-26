import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  FileText,
  Activity,
  GraduationCap,
  AlertTriangle,
  ClipboardList,
  LifeBuoy,
  Users,
} from "lucide-react";
import Sidebar from "../components/sideBar";
import { useQuery } from "@tanstack/react-query";
import {
  getAllEducationPosts,
  getAllHotspots,
  getAllReports,
  getAllUsers,
} from "../utils/apiCalls";

function AdminDashboard() {
  const { data: AllEducationPosts } = useQuery({
    queryKey: ["educationPosts"],
    queryFn: getAllEducationPosts,
  });
  const { data: AllHotspotPosts } = useQuery({
    queryKey: ["hotspots"],
    queryFn: getAllHotspots,
  });
  const { data: AllReportPosts } = useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
  });

  const { data: AllUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log(AllEducationPosts?.posts?.length);
  console.log(AllHotspotPosts?.posts?.length);
  console.log(AllReportPosts?.reports?.length);

  const WaterIssuePostsLength = AllReportPosts?.reports.filter((post) => {
    return post.phValue > 7;
  });

  return (
    <div className=" bg-[#F8FAFC] min-h-screen">
      <Sidebar role="admin" />

      <div className="ml-64 p-6 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold text-[#111827] mb-6">
          Welcome, Admin 👋
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
            <Users className="text-[#2563EB]" size={28} />
            <h2 className="font-semibold text-lg mt-2 text-black">
              {AllUsers?.users?.length}
            </h2>
            <p className="text-sm text-[#6B7280]">Active Users</p>x
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
            <ClipboardList className="text-[#10B981]" size={28} />
            <h2 className="font-semibold text-lg mt-2 text-black">
              {AllReportPosts?.reports?.length}
            </h2>
            <p className="text-sm text-[#6B7280]">Reports Submitted</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
            <AlertTriangle className="text-[#F59E0B]" size={28} />
            <h2 className="font-semibold text-lg mt-2 text-black">
              {AllHotspotPosts?.posts?.length}
            </h2>
            <p className="text-sm text-[#6B7280]">Active Hotspots</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
            <Activity className="text-[#EF4444]" size={28} />
            <h2 className="font-semibold text-lg mt-2 text-black">
              {WaterIssuePostsLength?.length}
            </h2>
            <p className="text-sm text-[#6B7280]">Water Issues</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-[#111827]">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link
            to="/admin/education"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <GraduationCap size={32} />
            <h3 className="mt-3 font-semibold text-lg">Education</h3>
            <p className="text-sm opacity-80">Manage awareness posts</p>
          </Link>

          <Link
            to="/admin/hotspots"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <AlertTriangle size={32} />
            <h3 className="mt-3 font-semibold text-lg">Hotspots</h3>
            <p className="text-sm opacity-80">Track health hotspots</p>
          </Link>

          <Link
            to="/admin/reports"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <FileText size={32} />
            <h3 className="mt-3 font-semibold text-lg">Reports</h3>
            <p className="text-sm opacity-80">View community reports</p>
          </Link>

          <Link
            to="/admin/help"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
          >
            <LifeBuoy size={32} />
            <h3 className="mt-3 font-semibold text-lg">Help Desk</h3>
            <p className="text-sm opacity-80">Resolve user queries</p>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-[#111827]">
            Recent User Reports
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F1F5F9] text-gray-700 text-sm">
                <th className="text-left py-2 px-3">User</th>
                <th className="text-left py-2 px-3">Issue</th>
                <th className="text-left py-2 px-3">Location</th>
                <th className="text-left py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t text-gray-600 hover:bg-gray-50">
                <td className="py-2 px-3">Ravi</td>
                <td className="py-2 px-3">Cholera symptoms</td>
                <td className="py-2 px-3">Village A</td>
                <td className="py-2 px-3">2 Sept 2025</td>
              </tr>
              <tr className="border-t text-gray-600 hover:bg-gray-50">
                <td className="py-2 px-3">Meera</td>
                <td className="py-2 px-3">Water contamination</td>
                <td className="py-2 px-3">Village B</td>
                <td className="py-2 px-3">1 Sept 2025</td>
              </tr>
              <tr className="border-t text-gray-600 hover:bg-gray-50">
                <td className="py-2 px-3">Amit</td>
                <td className="py-2 px-3">Typhoid suspicion</td>
                <td className="py-2 px-3">Village C</td>
                <td className="py-2 px-3">30 Aug 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
