// import { USER_STORE_KEY } from "@/data/constants";
//
// const HTTP_BASE = import.meta.env.VITE_API_URL;
//
// const defaultHeaders = {
//   "Content-Type": "application/json",
// };
//
// const getAuthHeaders = () => {
//   const user = localStorage.getItem(USER_STORE_KEY);
//
//   if (user) {
//     const userStorage = JSON.parse(user);
//     return {
//       ...defaultHeaders,
//       Authorization: `Bearer ${userStorage?.state?.token}`,
//     };
//   }
//   return defaultHeaders;
// };
//
// export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
//   const response = await fetch(`${HTTP_BASE}${endpoint}`, {
//     ...options,
//     headers: getAuthHeaders(),
//   });
//   return response.json();
// };
import { USER_STORE_KEY } from "@/data/constants";
import API_URLS from "./apiUrlPaths";

const HTTP_BASE = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
};

// متغير لتتبع إذا كان هناك محاولة تحديث جارية
let isRefreshing = false;
// قائمة انتظار للطلبات المعلقة أثناء التحديث
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

/**
 * معالجة قائمة الانتظار بعد نجاح أو فشل التحديث
 */
const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

/**
 * الحصول على بيانات المستخدم من localStorage
 */
const getUserStorage = () => {
  const user = localStorage.getItem(USER_STORE_KEY);
  if (user) {
    try {
      const userStorage = JSON.parse(user);
      return userStorage?.state || null;
    } catch (error) {
      console.error("Error parsing user storage:", error);
      return null;
    }
  }
  return null;
};

/**
 * تحديث التوكن في localStorage
 */
const updateTokenInStorage = (newToken: string) => {
  const user = localStorage.getItem(USER_STORE_KEY);
  if (user) {
    try {
      const userStorage = JSON.parse(user);
      userStorage.state.token = newToken;
      localStorage.setItem(USER_STORE_KEY, JSON.stringify(userStorage));
    } catch (error) {
      console.error("Error updating token in storage:", error);
    }
  }
};

/**
 * تسجيل الخروج وإعادة التوجيه لصفحة تسجيل الدخول
 */
const handleLogout = () => {
  localStorage.removeItem(USER_STORE_KEY);
  window.location.href = "/login";
};

/**
 * الحصول على Headers مع التوكن
 */
const getAuthHeaders = () => {
  const userStorage = getUserStorage();
  if (userStorage?.token) {
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${userStorage.token}`,
    };
  }
  return defaultHeaders;
};

/**
 * تحديث التوكن من خلال refresh endpoint
 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const userStorage = getUserStorage();
    if (!userStorage?.token) {
      throw new Error("No token available");
    }

    const response = await fetch(`${HTTP_BASE}${API_URLS.BASE_AUTH}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStorage.token}`,
      },
    });

    const data = await response.json();

    // إذا كان التحديث ناجحاً
    if (response.ok && data.success && data.data?.accessToken) {
      const newToken = data.data.accessToken;
      updateTokenInStorage(newToken);
      return newToken;
    }

    // إذا فشل التحديث (401 أو أي خطأ آخر)
    if (response.status === 401 || !data.success) {
      handleLogout();
      return null;
    }

    throw new Error(data.message || "Failed to refresh token");
  } catch (error) {
    console.error("Error refreshing token:", error);
    handleLogout();
    return null;
  }
};

/**
 * الدالة المركزية لإرسال الطلبات
 */
export const apiFetch = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<any> => {
  try {
    // إرسال الطلب الأول
    const response = await fetch(`${HTTP_BASE}${endpoint}`, {
      ...options,
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    // إذا كانت الاستجابة ناجحة
    if (response.ok) {
      return data;
    }

    // إذا كانت الاستجابة 401 (Unauthorized)
    if (response.status === 401 && data.errors?.statusCode === 401) {
      // إذا كان هناك تحديث جاري، ننتظر
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
            .then(() => {
              // بعد نجاح التحديث، نعيد إرسال الطلب
              return apiFetch(endpoint, options);
            })
            .catch((error) => {
              return Promise.reject(error);
            });
      }

      // بدء عملية التحديث
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();

        if (newToken) {
          // نجح التحديث
          isRefreshing = false;
          processQueue();

          // إعادة إرسال الطلب الأصلي مع التوكن الجديد
          return apiFetch(endpoint, options);
        } else {
          // فشل التحديث
          isRefreshing = false;
          processQueue(new Error("Token refresh failed"));
          return Promise.reject(data);
        }
      } catch (error) {
        isRefreshing = false;
        processQueue(error);
        return Promise.reject(error);
      }
    }

    // أي خطأ آخر غير 401
    return Promise.reject(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return Promise.reject(error);
  }
};

/**
 * دالة مساعدة للتحقق من صلاحية التوكن قبل إرسال الطلب
 */
export const isTokenValid = (): boolean => {
  const userStorage = getUserStorage();
  return !!userStorage?.token;
};

/**
 * دالة لتسجيل الخروج يدوياً
 */
export const forceLogout = () => {
  handleLogout();
};