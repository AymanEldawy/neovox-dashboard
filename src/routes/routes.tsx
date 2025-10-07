import Layout from "@/components/layout/Layout";
import PublicLayout from "@/components/layout/PublicLayout";
import PATHS from "@/data/paths";
import {lazy} from "react";
import type {RouteObject} from "react-router-dom";
import NotFound from "../pages/NotFound";
import InvestmentPlanPage from "@/components/forms/container/investmentPlans/components_forms_InvestmentPlansForm.tsx";
import TaskManagementForm from "@/pages/missions/AddMission.tsx";
import DepositsTable from "@/pages/financials/Deposits.tsx";
import WithdrawalsTable from "@/pages/financials/Withdrawals.tsx";
import SettingsPage from "@/pages/Setting.tsx";
import Teams from "@/pages/teams/Teams.tsx";

const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"))
const Login = lazy(() => import("../pages/auth/Login"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Badges = lazy(() => import("../pages/Badges"));
const DailyTasks = lazy(() => import("../pages/DailyTasks"));
const InvestmentPlans = lazy(() => import("../pages/investment-plans/InvestmentPlans.tsx"));
const Missions = lazy(() => import("../pages/missions/Missions.tsx"));
const Referrals = lazy(() => import("../pages/Referrals"));
const Users = lazy(() => import("../pages/Users"));

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: PATHS.BADGES,
                children: [
                    {
                        index: true,
                        element: <Badges/>,
                    },
                    {
                        path: PATHS.ADD_BADGE,
                        element: <Badges/>,
                    },
                ]
            },
            {
                path: PATHS.DEPOSITS,
                element: <DepositsTable/>,
            }, {
                path: PATHS.WITHDRAWALS,
                element: <WithdrawalsTable/>,
            }, {
                path: PATHS.DAILY_TASKS,
                element: <DailyTasks/>,
            },
            {
                path: PATHS.INVESTMENT_PLANS,
                element: <InvestmentPlans/>,

            },
            {
                path: `${PATHS.ADD_INVESTMENT_PLAN}/:id`,
                element: <InvestmentPlanPage />,
            },
            {
                path: PATHS.ADD_INVESTMENT_PLAN,
                element: <InvestmentPlanPage/>,
            },

            {
                path: PATHS.MISSIONS,
                element: <Missions/>,
            },
            {
                path: PATHS.ADD_MISSION,
                element: <TaskManagementForm/>,
            },
            {
                path: PATHS.REFERRALS,
                element: <Referrals/>,
            },
            {
                path: PATHS.USERS,
                element: <Users/>,
            },
            {
                path: PATHS.SETTINGS,
                element: <SettingsPage/>,
            },
            {
                path: PATHS.TEAMS,
                element: <Teams/>,
            }
        ],
        element: <Layout/>,
    },
    {
        path: "/",
        children: [
            { path: PATHS.LOGIN, element: <Login/>},
            {path: PATHS.FORGET_PASSWORD, element: <ForgetPassword/>},
        ],
        element: <PublicLayout/>,
    },

    {
        path: "*",
        element: <NotFound/>
    }
];


export default routes
