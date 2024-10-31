import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import LoginPage from "./pages/Login/index";
import ManageClaims from "./pages/ManageClaims/index";
import ListMRFFiles from "./pages/ListMRFFiles/index";
import ProtectedRoute from "./components/ProtectedRoute";

const publicRoutesWithoutLayout = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
];

const publicRoutesWithLayout = [
  {
    path: "/list-mrf-files",
    element: <ListMRFFiles />,
  }
];

const protectedRoutesWittLayout = [
  {
    path: "/manage-claims",
    element: <ManageClaims />,
  }
];


const router = createBrowserRouter([
  {
    children : publicRoutesWithoutLayout
  },
  {
    children: [
      {
        element: <BasicLayout />,
        children: publicRoutesWithLayout
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <BasicLayout />,
            children: protectedRoutesWittLayout
          },
        ]
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
