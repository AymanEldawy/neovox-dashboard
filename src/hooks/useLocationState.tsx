import { useLocation } from "react-router-dom";

const useLocationState = () => {
  const location = useLocation();
  return location.state || {};
};

export default useLocationState;
