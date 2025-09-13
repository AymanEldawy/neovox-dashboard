import { useAuthStore } from "@/store/authStore";

const withLoggedIn = (Component: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { user, token } = useAuthStore();

    // if (!user && !token) {
    //   return <Navigate to="/login" replace />;
    // }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withLoggedIn;