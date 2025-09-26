import React, { useState } from "react";
import { MapPin, AlertTriangle, ShieldCheck, X } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { editHotspot, deleteHotspot, AuthUser } from "../utils/apiCalls";
import toast from "react-hot-toast";

const HotspotCard = ({ spot }) => {
  const { areaName, location, disease, severity, casesReported, _id } = spot;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    areaName,
    location,
    disease,
    severity,
    casesReported,
  });

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });

  const role = authUser?.data?.user?.status;

  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isPending: isEditing } = useMutation({
    mutationFn: ({ id, data }) => editHotspot(id, data),
    onSuccess: () => {
      toast.success("Hotspot updated successfully!");
      queryClient.invalidateQueries(["hotspots"]);
      setOpen(false);
    },
  });

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteHotspot,
    onSuccess: () => {
      toast.success("Hotspot deleted successfully!");
      queryClient.invalidateQueries(["hotspots"]);
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateEdit({ id: _id, data: formData });
  };

  const riskStyles = {
    Critical: "bg-red-100 text-red-800 border-red-300",
    High: "bg-orange-100 text-orange-800 border-orange-300",
    Moderate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-green-100 text-green-800 border-green-300",
  };

  const riskIcons = {
    Critical: <AlertTriangle className="w-5 h-5 mr-1 text-red-600" />,
    High: <AlertTriangle className="w-5 h-5 mr-1 text-orange-600" />,
    Moderate: <AlertTriangle className="w-5 h-5 mr-1 text-yellow-600" />,
    Low: <ShieldCheck className="w-5 h-5 mr-1 text-green-600" />,
  };

  return (
    <>
      
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl shadow-md transition-all duration-300 p-6 border border-gray-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      >
        <div className="flex items-center mb-3">
          <div className="bg-[#2563EB]/10 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-[#111827]">{areaName}</h3>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>

        <p className="text-sm text-[#374151] mb-1">
          🦠 Disease: <span className="font-medium">{disease}</span>
        </p>

        <p className="text-sm text-[#6B7280] mb-3">
          🧍 Cases Reported: <span className="font-semibold">{casesReported}</span>
        </p>

        <div
          className={`flex items-center px-3 py-1 text-sm font-medium rounded-full border w-fit ${riskStyles[severity]}`}
        >
          {riskIcons[severity]} Risk: {severity}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[#111827] mb-4">
              Hotspot Details
            </h2>

            <p className="mb-2">
              <strong>📍 Area:</strong> {formData.areaName}
            </p>
            <p className="mb-2">
              <strong>🌍 Location:</strong> {formData.location}
            </p>
            <p className="mb-2">
              <strong>🦠 Disease:</strong> {formData.disease}
            </p>
            <p className="mb-2">
              <strong>🧍 Cases:</strong> {formData.casesReported}
            </p>
            <p className="mb-4">
              <strong>⚠️ Severity:</strong>{" "}
              <span className={`px-2 py-1 rounded ${riskStyles[formData.severity]}`}>
                {formData.severity}
              </span>
            </p>

            {role === "admin" && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={formData.areaName}
                  onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                  className="input input-bordered w-full rounded-md"
                />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input input-bordered w-full rounded-md"
                />
                <input
                  type="text"
                  value={formData.disease}
                  onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                  className="input input-bordered w-full rounded-md"
                />
                <input
                  type="number"
                  value={formData.casesReported}
                  onChange={(e) =>
                    setFormData({ ...formData, casesReported: e.target.value })
                  }
                  className="input input-bordered w-full rounded-md"
                />
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => mutateDelete(_id)}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="submit"
                    disabled={isEditing}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isEditing ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HotspotCard;
