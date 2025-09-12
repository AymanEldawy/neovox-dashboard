import { useNavigate, useSearchParams } from "react-router-dom";
import usePathname from "./usePathname";
import { useCallback, useMemo } from "react";
import useLocationState from "./useLocationState";

export const SEARCH_PARAMS_OPERATIONS = {
  REMOVE: "remove",
  REMOVE_ALL: "removeAll",
};

export const SEARCH_PARAMS_TYPES = {
  ARRAY: "array",
};

const useUpdateSearchParams = () => {
  const pathname = usePathname();
  const navigate = useNavigate();
  const locationState = useLocationState();
  const [searchParams] = useSearchParams();

  const oldSearchParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const updateSearchParams = useCallback(
    (searchParamsArray = [], options = {}) => {
      let newSearchParams = {
        ...oldSearchParams,
      };

      searchParamsArray.forEach((searchParam) => {
        let { name, value } = searchParam;

        if (Array.isArray(value)) {
          newSearchParams[name] = value;
          return;
        }

        const searchParamOptions = options[name];

        const { type: searchParamType, operation: searchParamOperation } =
          searchParamOptions || {};
        const isSearchParamArray =
          searchParamType === SEARCH_PARAMS_TYPES.ARRAY;

        if (isSearchParamArray) {
          const previousSearchParams = newSearchParams[name] || [];
          let newValue;
          if (searchParamOperation === SEARCH_PARAMS_OPERATIONS.REMOVE_ALL) {
            newValue = null;
          } else if (searchParamOperation === SEARCH_PARAMS_OPERATIONS.REMOVE) {
            newValue = Array.isArray(previousSearchParams)
              ? previousSearchParams.filter((val) => val != value)
              : null;
          } else {
            newValue = [...new Set([...previousSearchParams, String(value)])];
          }
          value = newValue;
        }

        newSearchParams[name] = value;
      });

      const queryString = Object.entries(newSearchParams)
        ?.map(([key, value]) => {
          if (!value || (Array.isArray(value) && !value.length)) return "";

          if (Array.isArray(value)) {
            return value
              .map((val) => `${key}=${encodeURIComponent(val)}`)
              .join("&");
          }

          return `${key}=${encodeURIComponent(value)}`;
        })
        .filter((param) => param)
        .join("&");

      const newURL = `${pathname}?${queryString}`;

      navigate(newURL, { state: locationState });
    },
    [navigate, pathname, locationState, oldSearchParams]
  );

  return updateSearchParams;
};

export default useUpdateSearchParams;
