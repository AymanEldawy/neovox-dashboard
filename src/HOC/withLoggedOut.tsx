import { useAuthStore } from "@/store/authStore";
import React from 'react';
import {Navigate} from "react-router-dom";


const withLoggedOut = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useAuthStore();

    // if (user || token) {
    //   return <Navigate to="/" replace />;
    // }

    return <Component {...props} />;
  };

  return Wrapper;
};
export default withLoggedOut