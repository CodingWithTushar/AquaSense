import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center text-[#111827]">
      <div className="mb-6 animate-spin">
        <Loader2 className="w-16 h-16 text-[#2563EB]" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
        Preparing Your Experience...
      </h1>

      <div className="w-64 h-3 bg-[#F1F5F9] rounded-full overflow-hidden shadow-md">
        <div className="h-full bg-[#2563EB] animate-progress"></div>
      </div>

      <p className="mt-6 text-[#374151]">
        Please wait while we load the resources...
      </p>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 80%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
