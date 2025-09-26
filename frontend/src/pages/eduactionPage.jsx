import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import { Plus, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthUser,
  createEducationPost,
  getAllEducationPosts,
} from "../utils/apiCalls.js";
import LoadingPage from "./loadingPage.jsx";
import toast from "react-hot-toast";

const EducationPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["educationPosts"],
    queryFn: getAllEducationPosts,
    retry: false,
  });

  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });
  const role = authData?.user?.status;

  const posts = data?.posts || [];

  const categories = ["General", "Hygiene", "Water", "Disease"];
  const groupedPosts = categories.map((category) => ({
    name: category,
    items: posts.filter((post) => post.category === category),
  }));

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createEducationPost,
    onSuccess: () => {
      toast.success("New Education Post has been created");
      setOpen(false);
      setFormData({ title: "", description: "", category: "General" });
      queryClient.invalidateQueries(["educationPosts"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required!");
      return;
    }
    mutate(formData);
  };

  if (isLoading) return <LoadingPage />;

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium">
          Failed to load posts: {fetchError.message}
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
            <h1 className="text-3xl font-bold text-[#111827]">
              Health Education
            </h1>
            <p className="text-[#6B7280] text-sm">
              Learn, share, and grow with essential knowledge for a healthier
              community.
            </p>
          </div>

          {role === "admin" && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Plus size={18} />
              Add
            </button>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white p-5 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">
            💡 Why Health Education Matters?
          </h2>
          <p className="text-sm">
            A well-informed community is a safe community. By spreading
            knowledge about hygiene, safe water practices, and early disease
            detection, you can help prevent outbreaks and save lives.
          </p>
        </div>

        {groupedPosts.map(({ name, items }) => (
          <div key={name} className="mb-10">
            <h2 className="text-2xl font-bold text-[#111827] mb-4 flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  name === "General"
                    ? "bg-gray-100 text-gray-700"
                    : name === "Hygiene"
                    ? "bg-green-100 text-green-700"
                    : name === "Water"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {name}
              </span>
              <span className="text-sm text-gray-500">
                ({items.length} posts)
              </span>
            </h2>

            {items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
                  >
                    <h3 className="text-xl font-semibold text-[#111827] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7280] line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <button
                        onClick={() => setSelectedPost(item)} 
                        className="text-blue-600 font-medium hover:underline cursor-pointer"
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">
                No posts available under {name}.
              </p>
            )}
          </div>
        ))}
      </div>

      {open && role === "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md transform transition-all scale-100 animate-fadeIn"
          >
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              Add New Education Topic
            </h2>
            <p className="text-[#6B7280] mb-4">
              Fill in the details below to add a new topic for your community.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
              />
              <textarea
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="textarea textarea-bordered w-full rounded-3xl border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
              ></textarea>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="select select-bordered w-full rounded-full border border-gray-300 bg-white text-[#111827] text-base px-3 py-2 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-200"
              >
                <option value="Water">Water</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Disease">Disease</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn border-none btn-outline bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-105 transition-all duration-200"
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

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-lg relative animate-fadeIn">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">
              {selectedPost.title}
            </h2>
            <p className="text-[#6B7280] mb-4">{selectedPost.description}</p>
            <span className="inline-block text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationPage;
