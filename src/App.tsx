import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "sonner";

import Index from "./pages/others/Index";
import Auth from "./pages/others/Auth";
import ProfileSetup from "./pages/user/ProfileSetup";
import UserHome from "./pages/user/UserHome";
import HospitalHome from "./pages/hospital/HospitalHome";
import PatientDetail from "./pages/hospital/PatientDetail";
import NotFound from "./pages/others/NotFound";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/user/profile-setup",
      element: <ProfileSetup />,
    },
    {
      path: "/user/home",
      element: <UserHome />,
    },
    {
      path: "/hospital/home",
      element: <HospitalHome />,
    },
    {
      path: "/hospital/patient/:userId",
      element: <PatientDetail />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
