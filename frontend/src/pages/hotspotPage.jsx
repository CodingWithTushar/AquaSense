import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUser, createHotspot, getAllHotspots } from "../utils/apiCalls.js";
import LoadingPage from "./loadingPage.jsx";
import HotspotCard from "../components/hotspotCard";
import toast from "react-hot-toast";

const HotspotPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    areaName: "",
    location: "",
    disease: "Other",
    casesReported: 0,
    severity: "Low",
  });

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hotspots"],
    queryFn: getAllHotspots,
    retry: false,
  });

  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });
  const role = authData?.user?.status;

  const hotspots = data?.posts || [];

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createHotspot,
    onSuccess: () => {
      toast.success("New hotspot has been created");
      setOpen(false);
      setFormData({
        areaName: "",
        location: "",
        disease: "Cholera",
        casesReported: 0,
        severity: "Low",
      });
      queryClient.invalidateQueries(["hotspots"]); 
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create hotspot");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.areaName || !formData.location) {
      toast.error("Area name and location are required!");
      return;
    }
    mutate(formData);
  };

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium">
          Failed to load hotspots: {error.message}
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
            <h1 className="text-3xl font-bold text-[#111827]">Hotspot Areas</h1>
            <p className="text-[#6B7280] text-sm">
              Track regions with rising health risks and reported cases.
            </p>
          </div>

          {role === "admin" && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Plus size={18} />
              Add
            </button>
          )}
        </div>

       
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-5 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">
            🚨 Why Monitor Hotspots?
          </h2>
          <p className="text-sm">
            Identifying and monitoring hotspot regions helps prevent outbreaks
            by enabling quick response and targeted health interventions.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotspots.length > 0 ? (
            hotspots.map((spot) => <HotspotCard key={spot._id} spot={spot} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No hotspots available.
            </p>
          )}
        </div>
      </div>

      {open && role === "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md transform transition-all scale-100 animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              Add New Hotspot
            </h2>
            <p className="text-[#6B7280] mb-4">
              Provide hotspot details to help your community stay safe.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Area Name"
                value={formData.areaName}
                onChange={(e) =>
                  setFormData({ ...formData, areaName: e.target.value })
                }
                className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              />

              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              />

              <select
                value={formData.disease}
                onChange={(e) =>
                  setFormData({ ...formData, disease: e.target.value })
                }
                className="select select-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              >
                <option value="Cholera">Cholera</option>
                <option value="Typhoid">Typhoid</option>
                <option value="Diarrhea">Diarrhea</option>
                <option value="Dengue">Dengue</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="number"
                placeholder="Cases Reported"
                min="0"
                value={formData.casesReported}
                onChange={(e) =>
                  setFormData({ ...formData, casesReported: e.target.value })
                }
                className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              />

              <select
                value={formData.severity}
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value })
                }
                className="select select-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn border-none btn-outline bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn border-none bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow hover:scale-105 transition-all duration-200"
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

export default HotspotPage;
