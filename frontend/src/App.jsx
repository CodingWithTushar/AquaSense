import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LogInPage from "./pages/logInPage";
import AboutPage from "./pages/aboutPage";
import ContactUsPage from "./pages/contactUsPage";
import LoadingPage from "./pages/loadingPage";
import UserDashboard from "./pages/userDashboard";
import HelpPage from "./pages/helpPage";
import SignupPage from "./pages/signupPage";
import HotspotPage from "./pages/hotspotPage";
import ReportPage from "./pages/reportPage";
import EducationPage from "./pages/eduactionPage";
import InnerHelpPage from "./pages/innerHelpPage";
import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "./utils/apiCalls";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });

  const user = authUser?.data?.user;
  const role = user?.status;
  const isAuthenticated = Boolean(user);

  if (authUser?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> 
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "admin" ? <AdminDashboard /> : <UserDashboard />
            ) : (
              <LogInPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LogInPage />
            ) : role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          }
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminDashboard /> : <LogInPage />}
        />
        <Route
          path="/user"
          element={isAuthenticated ? <UserDashboard /> : <LogInPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        {role && (
          <>
            <Route
              path={`/${role}/education`}
              element={isAuthenticated ? <EducationPage /> : <LogInPage />}
            />
            <Route
              path={`/${role}/hotspots`}
              element={isAuthenticated ? <HotspotPage /> : <LogInPage />}
            />
            <Route
              path={`/${role}/reports`}
              element={isAuthenticated ? <ReportPage /> : <LogInPage />}
            />
            <Route
              path={`/${role}/help`}
              element={isAuthenticated ? <InnerHelpPage /> : <LogInPage />}
            />
          </>
        )}
      </Routes>
    </>
  );
}
 export default App;
