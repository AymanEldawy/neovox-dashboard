import {DashboardIcon, FinancialIcon, InvestmentIcon, MissionIcon, SettingsIcon, TeamIcon,} from "@/components/icons";
import {UsersIcon} from "lucide-react";
import type {JSX} from "react";
import PATHS from "./paths";
import PERMISSIONS from "./permissions";
import ROLES from "@/data/roles.ts";

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
        permissions: PERMISSIONS[ROLES.ADMIN],
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
        path: PATHS.MISSIONS,
        permissions: PERMISSIONS[PATHS.MISSIONS],
        icon: <MissionIcon className="h-6 w-6"/>,
    },
    {
        name: "investmentPlans",
        path: PATHS.INVESTMENT_PLANS,
        permissions: PERMISSIONS[PATHS.INVESTMENT_PLANS],
        icon: <InvestmentIcon className="h-6 w-6"/>,

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
        name: "cryptos",
        path: PATHS.CRYPTOS,
        permissions: PERMISSIONS[PATHS.CRYPTOS],
        icon: <TeamIcon className="h-6 w-6"/>,
    },
    {
        name: "employees",
        path: PATHS.EMPLOYEES,
        permissions: PERMISSIONS[PATHS.EMPLOYEES],
        icon: <TeamIcon className="h-6 w-6"/>,
    }
    ,
    // {
    //     name: "referrals",
    //     path: PATHS.REFERRALS,
    //     permissions: PERMISSIONS[PATHS.REFERRALS],
    //     icon: <ReferralIcon className="h-6 w-6"/>,
    //     // children: [
    //     //   { name: 'referrals', path: PATHS.REFERRALS, permissions: PERMISSIONS[PATHS.REFERRALS] },
    //     //   { name: 'referralQualifications', path: PATHS.REFERRAL_QUALIFICATIONS, permissions: PERMISSIONS[PATHS.REFERRAL_QUALIFICATIONS] },
    //     // ],
    // },
    // {
    //     name: "badges",
    //     path: PATHS.BADGES,
    //     permissions: PERMISSIONS[PATHS.BADGES],
    //     icon: <BadgeIcon className="h-6 w-6"/>,
    // },
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