import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import ReportCard from "../components/reportCard";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthUser, getAllReports, createReport } from "../utils/apiCalls";
import LoadingPage from "./loadingPage";
import toast from "react-hot-toast";

const ReportPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    colour: "",
    hardness: "",
    Odour: "",
    phValue: "",
    turbidityNTU: "",
    totalDissolvedSolids: "",
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  });

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
    retry: false,
  });

  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });
  const role = authData?.user?.status;

  const reports = data?.reports || [];

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("New report has been created");
      setOpen(false);
      setFormData({
        colour: "",
        hardness: "",
        Odour: "",
        phValue: "",
        turbidityNTU: "",
        totalDissolvedSolids: "",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      });
      queryClient.invalidateQueries(["reports"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create report");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "colour",
      "hardness",
      "Odour",
      "phValue",
      "turbidityNTU",
      "totalDissolvedSolids",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required`);
        return;
      }
    }
    mutate(formData);
  };

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium">
          Failed to load reports: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7]">
      <Sidebar role={role} />

      <div className="flex-1 p-6">
        
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur z-10 p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Reports</h1>
            <p className="text-[#6B7280] text-sm">
              View submitted reports and monitor their progress.
            </p>
          </div>

          {role === "admin" && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Plus size={18} /> Add
            </button>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-5 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">📊 Why Reports Matter?</h2>
          <p className="text-sm">
            Reports help track community issues, identify risks, and monitor
            progress on health interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.length > 0 ? (
            reports.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No reports available.
            </p>
          )}
        </div>
      </div>

      {open && role === "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md transform transition-all scale-100 animate-fadeIn space-y-4"
          >
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              Add New Report
            </h2>
            <p className="text-[#6B7280] mb-4">
              Provide detailed report data to help monitor community health.
            </p>

            <input
              type="text"
              placeholder="Colour"
              value={formData.colour}
              onChange={(e) =>
                setFormData({ ...formData, colour: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Hardness"
              value={formData.hardness}
              onChange={(e) =>
                setFormData({ ...formData, hardness: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Odour"
              value={formData.Odour}
              onChange={(e) =>
                setFormData({ ...formData, Odour: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="text"
              placeholder="pH Value"
              value={formData.phValue}
              onChange={(e) =>
                setFormData({ ...formData, phValue: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Turbidity (NTU)"
              value={formData.turbidityNTU}
              onChange={(e) =>
                setFormData({ ...formData, turbidityNTU: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Total Dissolved Solids"
              value={formData.totalDissolvedSolids}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalDissolvedSolids: e.target.value,
                })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="select select-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn border-none btn-outline bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl shadow hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn border-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
