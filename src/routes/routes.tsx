import Layout from "@/components/layout/Layout";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PATHS from "@/data/paths";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import InvestmentPlanPage from "@/components/forms/container/investmentPlans/components_forms_InvestmentPlansForm.tsx";
import TaskManagementForm from "@/pages/missions/AddMission.tsx";
import DepositsTable from "@/pages/financials/Deposits.tsx";
import WithdrawalsTable from "@/pages/financials/Withdrawals.tsx";
import SettingsPage from "@/pages/Setting.tsx";
import Teams from "@/pages/teams/Teams.tsx";
import TeamDetails from "@/pages/teams/TeamDetails.tsx";
import UserDetailsPage from "@/pages/users/UserDetsils.tsx";
import Employees from "@/pages/employee/Employees.tsx";
import AddEmployee from "@/pages/employee/AddEmployee.tsx";
import MangeCrypto from "@/pages/cryptos/MangeCrypto.tsx";
import CryptoManagementForm from "@/pages/cryptos/AddCryptos.tsx";
import Unauthorized from "@/pages/Unauthorized.tsx";

const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"))
const Login = lazy(() => import("../pages/auth/Login"))
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.tsx"))
const Badges = lazy(() => import("../pages/Badges"));
const DailyTasks = lazy(() => import("../pages/DailyTasks"));
const InvestmentPlans = lazy(() => import("../pages/investment-plans/InvestmentPlans.tsx"));
const Missions = lazy(() => import("../pages/missions/Missions.tsx"));
const Referrals = lazy(() => import("../pages/Referrals"));
const Users = lazy(() => import("../pages/users/Users.tsx"));

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <ProtectedRoute path={PATHS.DASHBOARD}><Dashboard /></ProtectedRoute>,
            },
            {
                path: PATHS.BADGES,
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute path={PATHS.BADGES}><Badges /></ProtectedRoute>,
                    },
                    {
                        path: PATHS.ADD_BADGE,
                        element: <ProtectedRoute path={PATHS.ADD_BADGE}><Badges /></ProtectedRoute>,
                    },
                ]
            },
            {
                path: PATHS.DEPOSITS,
                element: <ProtectedRoute path={PATHS.DEPOSITS}><DepositsTable /></ProtectedRoute>,
            }, {
                path: PATHS.WITHDRAWALS,
                element: <ProtectedRoute path={PATHS.WITHDRAWALS}><WithdrawalsTable /></ProtectedRoute>,
            }, {
                path: PATHS.DAILY_TASKS,
                element: <ProtectedRoute path={PATHS.DAILY_TASKS}><DailyTasks /></ProtectedRoute>,
            },
            {
                path: PATHS.INVESTMENT_PLANS,
                element: <ProtectedRoute path={PATHS.INVESTMENT_PLANS}><InvestmentPlans /></ProtectedRoute>,

            },
            {
                path: `${PATHS.ADD_INVESTMENT_PLAN}/:id`,
                element: <ProtectedRoute path={PATHS.ADD_INVESTMENT_PLAN}><InvestmentPlanPage /></ProtectedRoute>,
            },
            {
                path: PATHS.ADD_INVESTMENT_PLAN,
                element: <ProtectedRoute path={PATHS.ADD_INVESTMENT_PLAN}><InvestmentPlanPage /></ProtectedRoute>,
            },

            {
                path: PATHS.MISSIONS,
                element: <ProtectedRoute path={PATHS.MISSIONS}><Missions /></ProtectedRoute>,
            },
            {
                path: PATHS.ADD_MISSION,
                element: <ProtectedRoute path={PATHS.ADD_MISSION}><TaskManagementForm /></ProtectedRoute>,
            }, {
                path: `${PATHS.ADD_MISSION}/:id`,
                element: <ProtectedRoute path={PATHS.ADD_MISSION}><TaskManagementForm /></ProtectedRoute>,
            },
            {
                path: PATHS.REFERRALS,
                element: <ProtectedRoute path={PATHS.REFERRALS}><Referrals /></ProtectedRoute>,
            },
            {
                path: PATHS.USERS,
                element: <ProtectedRoute path={PATHS.USERS}><Users /></ProtectedRoute>,
            },
            {
                path: `${PATHS.ADD_USER}/:id`,
                element: <ProtectedRoute path={PATHS.ADD_USER}><UserDetailsPage /></ProtectedRoute>,
            },
            {
                path: PATHS.SETTINGS,
                element: <ProtectedRoute path={PATHS.SETTINGS}><SettingsPage /></ProtectedRoute>,
            },
            {
                path: PATHS.TEAMS,
                element: <ProtectedRoute path={PATHS.TEAMS}><Teams /></ProtectedRoute>,
            },
            {
                path: `${PATHS.ADD_TEAM}/:id`,
                element: <ProtectedRoute path={PATHS.ADD_TEAM}><TeamDetails /></ProtectedRoute>,
            },
            {
                path: PATHS.CRYPTOS,
                element: <ProtectedRoute path={PATHS.CRYPTOS}><MangeCrypto /></ProtectedRoute>,
            }, {
                path: `${PATHS.CRYPTOS}/add`,
                element: <ProtectedRoute path={PATHS.CRYPTOS}><CryptoManagementForm /></ProtectedRoute>,
            }, {
                path: PATHS.EMPLOYEES,
                element: <ProtectedRoute path={PATHS.EMPLOYEES}><Employees /></ProtectedRoute>,
            }, {
                path: `${PATHS.EMPLOYEES}/add`,
                element: <ProtectedRoute path={PATHS.EMPLOYEES}><AddEmployee /></ProtectedRoute>,
            }
        ],
        element: <Layout />,
    },
    {
        path: "/",
        children: [
            { path: PATHS.LOGIN, element: <Login /> },
            { path: PATHS.FORGET_PASSWORD, element: <ForgetPassword /> },
            { path: "/unauthorized", element: <Unauthorized /> },
        ],
        element: <PublicLayout />,
    },

    {
        path: "*",
        element: <NotFound />
    }
];


export default routes

