import React, { useState } from "react";
import {
  Droplets,
  FlaskConical,
  Activity,
  Waves,
  Beaker,
  Thermometer,
} from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { editReport, deleteReport, AuthUser } from "../utils/apiCalls";
import toast from "react-hot-toast";

const ReportCard = ({ report }) => {
  const {
    colour,
    hardness,
    Odour,
    phValue,
    turbidityNTU,
    totalDissolvedSolids,
    createdAt,
    _id,
  } = report;

  const [editOpen, setEditOpen] = useState(false); // edit modal
  const [viewOpen, setViewOpen] = useState(false); // view modal
  const [formData, setFormData] = useState({
    colour,
    hardness,
    Odour,
    phValue,
    turbidityNTU,
    totalDissolvedSolids,
  });

  // ✅ Get logged-in user role
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });
  const role = authUser?.data?.user?.status; // "admin" or "user"

  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }) => editReport(id, data),
    onSuccess: () => {
      toast.success("Report updated successfully!");
      queryClient.invalidateQueries(["reports"]);
      setEditOpen(false);
    },
  });

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      toast.success("Report deleted successfully!");
      queryClient.invalidateQueries(["reports"]);
      setEditOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateEdit({ id: _id, data: formData });
  };

  const handleDelete = () => {
    mutateDelete(_id);
  };

  // ✅ Card click
  const handleCardClick = () => {
    setViewOpen(true); // always open view dialog
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={handleCardClick}
        className={`bg-white rounded-2xl shadow-md transition-all duration-300 p-6 border border-gray-200 
          hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
      >
        <div className="flex items-center mb-4">
          <div className="bg-[#2563EB]/10 p-3 rounded-full">
            <Droplets className="w-6 h-6 text-[#2563EB]" />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-[#111827]">
            Water Quality Report
          </h3>
        </div>

        <p className="text-sm text-[#6B7280] mb-4">
          📅 {new Date(createdAt).toLocaleDateString()}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-[#374151]">Colour:</span>
            <span className="text-[#6B7280]">{colour}</span>
          </div>
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-[#374151]">Hardness:</span>
            <span className="text-[#6B7280]">{hardness}</span>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600" />
            <span className="font-medium text-[#374151]">Odour:</span>
            <span className="text-[#6B7280]">{Odour}</span>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-green-600" />
            <span className="font-medium text-[#374151]">pH Value:</span>
            <span className="text-[#6B7280]">{phValue}</span>
          </div>

          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-[#374151]">Turbidity (NTU):</span>
            <span className="text-[#6B7280]">{turbidityNTU}</span>
          </div>

          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-teal-600" />
            <span className="font-medium text-[#374151]">
              Total Dissolved Solids:
            </span>
            <span className="text-[#6B7280]">{totalDissolvedSolids}</span>
          </div>
        </div>
      </div>

      {/* ✅ View Dialog (User + Admin) */}
      {viewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#111827] mb-4">
              Report Details
            </h2>
            <ul className="space-y-2 text-[#374151] text-sm">
              <li>
                <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
              </li>
              <li>
                <strong>Colour:</strong> {colour}
              </li>
              <li>
                <strong>Hardness:</strong> {hardness}
              </li>
              <li>
                <strong>Odour:</strong> {Odour}
              </li>
              <li>
                <strong>pH Value:</strong> {phValue}
              </li>
              <li>
                <strong>Turbidity (NTU):</strong> {turbidityNTU}
              </li>
              <li>
                <strong>Total Dissolved Solids:</strong>{" "}
                {totalDissolvedSolids}
              </li>
            </ul>

            <div className="flex justify-end gap-3 mt-6">
              {/* Admins can edit */}
              {role === "admin" && (
                <button
                  onClick={() => {
                    setViewOpen(false);
                    setEditOpen(true);
                  }}
                  className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-105 transition-all border-none"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => setViewOpen(false)}
                className="btn bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl shadow hover:scale-105 transition-all border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Dialog (Admin Only) */}
      {editOpen && role === "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              Edit Report
            </h2>
            <p className="text-[#6B7280] mb-4">
              Update water report details or delete if no longer needed.
            </p>

            {/* Inputs */}
            <div className="space-y-4">
              {["colour", "hardness", "Odour", "phValue", "turbidityNTU", "totalDissolvedSolids"].map((field) => (
                <input
                  key={field}
                  type={field.includes("Value") || field.includes("NTU") ? "number" : "text"}
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full rounded-full border border-gray-300 px-3 py-2 shadow-sm 
                    focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                />
              ))}
            </div>

            <div className="flex justify-between items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="btn bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl shadow hover:scale-105"
              >
                Cancel
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="btn bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl shadow hover:scale-105"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-105"
                >
                  {isEditing ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ReportCard;
