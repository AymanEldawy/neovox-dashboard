import {
    BadgeIcon,
    DashboardIcon,
    FinancialIcon,
    InvestmentIcon,
    MissionIcon,
    ReferralIcon,
    SettingsIcon,
    TeamIcon,
} from "@/components/icons";
import {UsersIcon} from "lucide-react";
import type {JSX} from "react";
import PATHS from "./paths";
import PERMISSIONS from "./permissions";

type Item = {
    name: string;
    icon?: JSX.Element;
    permissions: string[];
}

type MenuItem = Item & {
    path: string;
};

type MenuGroup = Item & {
    children: MenuItem[];
};

export type SideMenuItem = MenuItem | MenuGroup;


const sideMenuItems: SideMenuItem[] = [
    {
        name: "dashboard",
        path: PATHS.DASHBOARD as string,
        permissions: PERMISSIONS[PATHS.DASHBOARD],
        icon: <DashboardIcon className="h-6 w-6"/>,
    },
    {
        name: "users",
        path: PATHS.USERS,
        permissions: PERMISSIONS[PATHS.USERS],
        icon: <UsersIcon className="h-6 w-6"/>,
    },
    {
        name: "teams",
        path: PATHS.TEAMS,
        permissions: PERMISSIONS[PATHS.TEAMS],
        icon: <TeamIcon className="h-6 w-6"/>,
    },
    {
        name: "missions",
        permissions: PERMISSIONS[PATHS.MISSIONS],
        icon: <MissionIcon className="h-6 w-6"/>,
        children: [
            {name: 'missions', path: PATHS.MISSIONS, permissions: PERMISSIONS[PATHS.MISSIONS]},
            {name: 'addMission', path: PATHS.ADD_MISSION, permissions: PERMISSIONS[PATHS.ADD_MISSION]},
            // {name: 'dailyTasks', path: PATHS.DAILY_TASKS, permissions: PERMISSIONS[PATHS.DAILY_TASKS]},
        ],
    },
    {
        name: "investments",
        permissions: PERMISSIONS[PATHS.INVESTMENT_PLANS],
        icon: <InvestmentIcon className="h-6 w-6"/>,
        children: [
            {name: 'investmentPlans', path: PATHS.INVESTMENT_PLANS, permissions: PERMISSIONS[PATHS.INVESTMENT_PLANS]},
            {
                name: 'addInvestmentPlan',
                path: PATHS.ADD_INVESTMENT_PLAN,
                permissions: PERMISSIONS[PATHS.ADD_INVESTMENT_PLAN]
            }],
    },
    {
        name: "financials",
        permissions: PERMISSIONS[PATHS.DEPOSITS],
        icon: <FinancialIcon className="h-6 w-6"/>,
        children: [
            {name: 'deposits', path: PATHS.DEPOSITS, permissions: PERMISSIONS[PATHS.DEPOSITS]},
            {name: 'withdrawals', path: PATHS.WITHDRAWALS, permissions: PERMISSIONS[PATHS.WITHDRAWALS]},
            // { name: 'transactions', path: PATHS.TRANSACTIONS, permissions: PERMISSIONS[PATHS.TRANSACTIONS] },
            // { name: 'creditTransactions', path: PATHS.CREDIT_TRANSACTIONS, permissions: PERMISSIONS[PATHS.CREDIT_TRANSACTIONS] },
            // { name: 'ledger', path: PATHS.LEDGER, permissions: PERMISSIONS[PATHS.LEDGER] },
        ],
    },
    {
        name: "referrals",
        path: PATHS.REFERRALS,
        permissions: PERMISSIONS[PATHS.REFERRALS],
        icon: <ReferralIcon className="h-6 w-6"/>,
        // children: [
        //   { name: 'referrals', path: PATHS.REFERRALS, permissions: PERMISSIONS[PATHS.REFERRALS] },
        //   { name: 'referralQualifications', path: PATHS.REFERRAL_QUALIFICATIONS, permissions: PERMISSIONS[PATHS.REFERRAL_QUALIFICATIONS] },
        // ],
    },
    {
        name: "badges",
        permissions: PERMISSIONS[PATHS.BADGES],
        icon: <BadgeIcon className="h-6 w-6"/>,
        children: [
            {name: 'badges', path: PATHS.BADGES, permissions: PERMISSIONS[PATHS.BADGES]},
            {name: 'addBadge', path: PATHS.ADD_BADGE, permissions: PERMISSIONS[PATHS.ADD_BADGE]},
        ],
    },
    // {
    //     name: "notifications",
    //     path: PATHS.NOTIFICATIONS,
    //     permissions: PERMISSIONS[PATHS.NOTIFICATIONS],
    //     icon: <NotificationIcon className="h-6 w-6"/>,
    // },
    // {
    //     name: "sessions",
    //     path: PATHS.SESSIONS,
    //     permissions: PERMISSIONS[PATHS.SESSIONS],
    //     icon: <SessionIcon className="h-6 w-6"/>,
    // },
    {
        name: "settings",
        path: PATHS.SETTINGS as string,
        permissions: PERMISSIONS[PATHS.SETTINGS],
        icon: <SettingsIcon className="h-6 w-6"/>,
    },
];

export default sideMenuItems;