import Layout from "@/components/layout/Layout";
import PublicLayout from "@/components/layout/PublicLayout";
import PATHS from "@/data/paths";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";

const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"))
const Login = lazy(() => import("../pages/auth/Login"))
const Dashboard = lazy(() => import("../pages/Dashboard"))

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
    element: <Layout />,
  },
  {
    path: "/",
    children: [
      { path: PATHS.LOGIN, element: <Login /> },
      { path: PATHS.FORGET_PASSWORD, element: <ForgetPassword /> },
    ],
    element: <PublicLayout />,
  },

  {
    path: "*",
    element: <NotFound />
  }
];


export default routes