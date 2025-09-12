import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import React from 'react'


const withLoggedOut = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useAuthStore();

    if (!user || !token) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};
export default withLoggedOut