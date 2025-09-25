import Layout from "@/components/layout/Layout";
import PublicLayout from "@/components/layout/PublicLayout";
import PATHS from "@/data/paths";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";

const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"))
const Login = lazy(() => import("../pages/auth/Login"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Badges = lazy(() => import("../pages/Badges"));
const DailyTasks = lazy(() => import("../pages/DailyTasks"));
const InvestmentPlans = lazy(() => import("../pages/InvestmentPlans"));
const Missions = lazy(() => import("../pages/Missions"));
const Notifications = lazy(() => import("../pages/Notifications"));
const PlanStates = lazy(() => import("../pages/PlanStates"));
const Referrals = lazy(() => import("../pages/Referrals"));
const UserBadges = lazy(() => import("../pages/UserBadges"));
const UserMissions = lazy(() => import("../pages/UserMissions"));
const Users = lazy(() => import("../pages/Users"));

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: PATHS.BADGES,
        children: [
          {
            index: true,
            element: <Badges />,
          },
          {
            path: PATHS.ADD_BADGE,
            element: <Badges />,
          },
        ]
      },
      {
        path: PATHS.DAILY_TASKS,
        element: <DailyTasks />,
      },
      {
        path: PATHS.INVESTMENT_PLANS,
        element: <InvestmentPlans />,
      },
      {
        path: PATHS.MISSIONS,
        element: <Missions />,
      },
      {
        path: PATHS.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: PATHS.PLAN_STATES,
        element: <PlanStates />,
      },
      {
        path: PATHS.REFERRALS,
        element: <Referrals />,
      },
      {
        path: PATHS.USER_BADGES,
        element: <UserBadges />,
      },
      {
        path: PATHS.USER_MISSIONS,
        element: <UserMissions />,
      },
      {
        path: PATHS.USERS,
        element: <Users />,
      },   {
        path: PATHS.TEAMS,
        element: <Users />,
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