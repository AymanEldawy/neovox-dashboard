import { useSearchParams } from "react-router-dom";

const useCustomSearchParams = (paramName) => {
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get(paramName);
  const searchParamsObject = Object.fromEntries(searchParams);

  return paramName
    ? (paramValue && decodeURIComponent(paramValue)) || ""
    : searchParamsObject || {};
};

export default useCustomSearchParams;
