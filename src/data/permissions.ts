import PATHS from "./paths";
import ROLES from "./roles";

const PERMISSIONS = {
  // صفحات عامة - متاحة للجميع
  [PATHS.DASHBOARD]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.LOGIN]: [],
  [PATHS.FORGET_PASSWORD]: [],
  [PATHS.RESET_PASSWORD]: [],

  // إدارة المستخدمين - للمسؤولين فقط
  [PATHS.ADD_USER]: [ROLES.ADMIN],
  [PATHS.USERS]: [ROLES.ADMIN, ROLES.EMPLOYEE], // الموظفين يمكنهم عرض المستخدمين فقط
  [PATHS.SETTINGS]: [ROLES.ADMIN],

  // الشارات - متاحة للموظفين
  [PATHS.BADGES]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.ADD_BADGE]: [ROLES.ADMIN], // إضافة شارات للمسؤولين فقط

  // خطط الاستثمار - متاحة للموظفين للعرض
  [PATHS.INVESTMENT_PLANS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.ADD_INVESTMENT_PLAN]: [ROLES.ADMIN], // إضافة خطط للمسؤولين فقط

  // المهام - متاحة للموظفين
  [PATHS.MISSIONS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.ADD_MISSION]: [ROLES.ADMIN], // إضافة مهام للمسؤولين فقط

  // الجلسات - للمسؤولين فقط
  [PATHS.SESSIONS]: [ROLES.ADMIN],

  // مجموعات الفرق - للمسؤولين فقط
  [PATHS.TEAM_POOLS]: [ROLES.ADMIN],
  [PATHS.ADD_TEAM_POOL]: [ROLES.ADMIN],

  // المعاملات المالية - للمسؤولين فقط (ممنوعة على الموظفين)
  [PATHS.CREDIT_TRANSACTIONS]: [ROLES.ADMIN],
  [PATHS.DEPOSITS]: [ROLES.ADMIN], // الإيداعات - للمسؤولين فقط
  [PATHS.WITHDRAWALS]: [ROLES.ADMIN], // السحوبات - للمسؤولين فقط
  [PATHS.LEDGER]: [ROLES.ADMIN], // دفتر الأستاذ - للمسؤولين فقط
  [PATHS.TRANSACTIONS]: [ROLES.ADMIN], // المعاملات - للمسؤولين فقط

  // المهام اليومية - متاحة للموظفين
  [PATHS.DAILY_TASKS]: [ROLES.ADMIN, ROLES.EMPLOYEE],

  // الإشعارات - متاحة للموظفين
  [PATHS.NOTIFICATIONS]: [ROLES.ADMIN, ROLES.EMPLOYEE],

  // الإحالات - متاحة للموظفين
  [PATHS.REFERRALS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.REFERRAL_QUALIFICATIONS]: [ROLES.ADMIN],

  // الفرق - متاحة للموظفين
  [PATHS.TEAMS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.ADD_TEAM]: [ROLES.ADMIN], // إضافة فرق للمسؤولين فقط
  [PATHS.TEAM_MEMBERS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.TEAM_MISSIONS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.ADD_TEAM_MISSION]: [ROLES.ADMIN],
  [PATHS.TEAM_MISSION_PROGRESS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.TEAM_MISSION_SHARDS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.TEAM_REWARDS]: [ROLES.ADMIN, ROLES.EMPLOYEE],
  [PATHS.TEAM_POOL_PARTICIPATION]: [ROLES.ADMIN],

  // بيانات المستخدمين - للمسؤولين فقط
  [PATHS.USER_BADGES]: [ROLES.ADMIN],
  [PATHS.USER_INVESTMENTS]: [ROLES.ADMIN],
  [PATHS.PLAN_STATES]: [ROLES.ADMIN],
  [PATHS.USER_MISSIONS]: [ROLES.ADMIN],

  // إدارة الموظفين والعملات - للمسؤولين فقط
  [PATHS.EMPLOYEES]: [ROLES.ADMIN],
  [PATHS.CRYPTOS]: [ROLES.ADMIN],
};

export default PERMISSIONS;
