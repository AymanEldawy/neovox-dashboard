const HTTP_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getAuthHeaders = () => {
  const user = localStorage.getItem("PARKING_USER_KEY");

  if (user) {
    const userStorage = JSON.parse(user);
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${userStorage?.state?.token}`,
    };
  }
  return defaultHeaders;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${HTTP_BASE}${endpoint}`, {
    ...options,
    headers: getAuthHeaders(),
  });
  return response.json();
};

/* ---- Auth ---- */
export const AuthService = {
  login: (data: { username: string; password: string }) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* ---- Master ---- */
export const MasterService = {
  getGates: () =>
    apiFetch("/master/gates", {
      method: "GET",
    }),

  getZonesByGateId: (gateId?: string) =>
    apiFetch(`/master/zones${gateId ? `?gateId=${gateId}` : ""}`, {
      method: "GET",
    }),
  getZones: () =>
    apiFetch("/master/zones", {
      method: "GET",
    }),

  getCategories: () =>
    apiFetch("/master/categories", {
      method: "GET",
    }),
};

/* ---- Subscriptions ---- */
export const SubscriptionService = {
  getById: (id: string) =>
    apiFetch(`/subscriptions/${id}`, {
      method: "GET",
    }),
};

/* ---- Tickets ---- */
export const TicketService = {
  checkin: (data: {
    gateId?: string;
    zoneId?: string;
    type: "visitor" | "subscriber";
    subscriptionId?: string;
  }) =>
    apiFetch("/tickets/checkin", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  checkout: (data: { ticketId: string; forceConvertToVisitor?: boolean }) =>
    apiFetch("/tickets/checkout", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getById: (id: string) =>
    apiFetch(`/tickets/${id}`, {
      method: "GET",
    }),
};

/* ---- Admin ---- */
export const AdminService = {
  getParkingState: () =>
    apiFetch("/admin/reports/parking-state", {
      method: "GET",
    }),
  updateCategory: (
    id: string,
    body: Partial<{
      rateNormal: number;
      rateSpecial: number;
      name: string;
      description: string;
    }>
  ) =>
    apiFetch(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  setZoneOpen: (id: string, open: boolean) =>
    apiFetch(`/admin/zones/${id}/open`, {
      method: "PUT",
      body: JSON.stringify({ open }),
    }),

  getZones: () =>
    apiFetch("/admin/zones", {
      method: "GET",
    }),

  createRushHours: (data: { weekDay: number; from: string; to: string }) =>
    apiFetch("/admin/rush-hours", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  createVacation: (data: { name: string; from: string; to: string }) =>
    apiFetch("/admin/vacations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getSubscriptions: () =>
    apiFetch("/admin/subscriptions", {
      method: "GET",
    }),

  getEmployees: () =>
    apiFetch("/admin/users", {
      method: "GET",
    }),

  createEmployee: (data: {
    username: string;
    password: string;
    role: string;
  }) =>
    apiFetch("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCategoryRate: (
    categoryId: string,
    rateNormal: number,
    rateSpecial: number
  ) =>
    apiFetch(`/admin/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify({ rateNormal, rateSpecial }),
    }),
};
