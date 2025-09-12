import SEARCH_PARAMS from "@/data/searchParamsKeys";
import useUpdateSearchParams from "@/hook/useUpdateSearchParams";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "../Icons";
import Btn from "../shared copy/Btn";

const ButtonWithOptions = ({ data, setOpenForm }) => {
  const { t } = useTranslation();
  const updateSearchParams = useUpdateSearchParams();
  const [open, setOpen] = useState(false);

  const handleChangeCode = (code) => {
    updateSearchParams([{ name: SEARCH_PARAMS.CODE, value: code }]);
    setOpen(false);
    setOpenForm(true);
  };

  return (
    <div className="relative">
      <Btn kind="primary" onClick={() => setOpen((p) => !p)}>
        <PlusIcon className="w-6 h-6" circle />
        {t("add_new")}
      </Btn>
      {open && (
        <ul className="absolute top-7 left-0 mt-2 min-w-40 flex flex-col gap-1 ltr:right-20 rtl:left-20 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-gray-500 dark:text-gray-400 font-medium text-xs">
          {data?.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleChangeCode(item.code);
              }}
              className="px-2 py-1 capitalize hover:bg-blue-100 hover:text-blue-600 cursor-pointer duration-150"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ButtonWithOptions;
