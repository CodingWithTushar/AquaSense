import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Input = ({
  title,
  type = "text",
  placeholder,
  className = "",
  value,
  onChange,
  name,
  icon: Icon,
}) => {
  return (
    <div className="form-control w-full mt-3">
      {title && (
        <label className="label mb-1">
          <span className="label-text text-sm font-semibold text-[#111827]">
            {title}
          </span>
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon size={20} />
          </span>
        )}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-gray-300 bg-white text-gray-900 text-base px-4 py-2 shadow-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] outline-none transition-all duration-200 ${
            Icon ? "pl-11" : ""
          } ${className}`}
          required
        />
      </div>
    </div>
  );
};

export const PasswordInput = ({
  title,
  placeholder,
  className = "",
  value,
  onChange,
  name,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control w-full mt-3">
      {title && (
        <label className="label mb-1">
          <span className="label-text text-sm font-semibold text-[#111827]">
            {title}
          </span>
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon size={20} />
          </span>
        )}
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full rounded-xl border border-gray-300 bg-white text-gray-900 text-base px-4 py-2 shadow-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB] outline-none transition-all duration-200 ${
            Icon ? "pl-11" : ""
          } ${className}`}
          required
        />
        <span
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    </div>
  );
};
