import { useState } from "react";
import toast from "react-hot-toast";
import { Input, PasswordInput } from "../components/input";
import {
  Mail,
  MapPinHouseIcon,
  User,
  Lock,
  Phone,
  LocateFixed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogIn } from "../utils/apiCalls.js";
import LoadingPage from "./loadingPage.jsx";

function LoginPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    phoneNumber: "",
    pinCode: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: LogIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("You have logged in successfully!");
    },
    onError: (err) => toast.error(err.message || "Something went wrong"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isPending) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EEF2FF] via-[#F9FAFB] to-[#F3F4F6] px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-200">
        
        
        <div className="hidden md:flex items-center justify-center bg-gray-50">
          <img
            src="/login.jpg"
            alt="Login illustration"
            className="w-full h-full object-cover max-h-[733px]"
          />
        </div>

       
        <div className="p-8 flex flex-col justify-center max-h-screen overflow-y-auto">
          <h2 className="text-3xl font-extrabold text-[#1E3A8A] text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mt-1">
            Please sign in to continue
          </p>

          <form className="mt-5" onSubmit={handleSubmit}>
            <Input title="Full Name" name="fullName" value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name" icon={User} />

            <Input title="Email Address" type="email" name="email"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email" icon={Mail} />

            <Input title="Location" type="text" name="location"
              value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter your location" icon={MapPinHouseIcon} />

            <Input title="Phone Number" type="text" name="phoneNumber"
              value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Enter your phone number" icon={Phone} />

            <Input title="Pin Code" type="text" name="pinCode"
              value={formData.pinCode} onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
              placeholder="Enter your pin code" icon={LocateFixed} />

            <PasswordInput title="Password" name="password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password" icon={Lock} />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-base mt-4 transition-all duration-200 hover:bg-[#1E40AF] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-[#2563EB] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
