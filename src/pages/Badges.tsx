import React from 'react';

const Badges: React.FC = () => {
  return (
    <div>
      <h1>Badges Page</h1>
      {/* Content for the Badges page goes here. */}
    </div>
  );
};

export default Badges;


import FormWrapper from "@/components/forms/wrapper/FormWrapper";
import QUERY_KEYS from "@/data/queryKeys";
import accountColumns from "@/helpers/account/accountColumns";
import {
  accountExcelColumns,
  accountHeaders,
  generateAccountDocument,
} from "@/helpers/account/accountDocument";
import {
  accountDefaultValue,
  accountValidationSchema,
} from "@/helpers/account/accountValidationSchema";
import {
  createAccount,
  deleteAccount,
  deleteManyAccounts,
  getAllAccounts,
  getSingleAccount,
  updateAccount,
} from "@/services/accountService";
import { lazy } from "react";
import PaperLayout from "../../../components/layout/paper/PaperLayout";
const AccountForm = lazy(() =>
  import("@/components/forms/containers/AccountForm")
);

const accountConfig = {
  name: "account",
  formProps: {
    defaultValue: accountDefaultValue,
    validationSchema: accountValidationSchema,
    mutationAddFunction: createAccount,
    mutationUpdateFunction: updateAccount,
    getSingleFunction: getSingleAccount,
    onSuccessAction: () => {},
    isSteps: false,
    onHandleDelete: deleteAccount,
    RenderForm: (props) => <AccountForm {...props} />,
  },
  formHeaderProps: {
    header: "account",
  },
};

const Account = ({
  formOnly,
  outerClose,
  defaultNumber,
  defaultCode,
  ...props
}) => {
  console.log(props, "props in account");

  if (formOnly) {
    return (
      <FormWrapper
        {...accountConfig}
        outerClose={outerClose}
        numberSearchParam={defaultNumber}
        codeSearchParam={defaultCode}
        {...props}
      />
    );
  }

  return (
    <PaperLayout
      name="account"
      queryKey={QUERY_KEYS.ACCOUNT}
      queryFn={getAllAccounts}
      handleDeleteSelected={deleteManyAccounts}
      paperHeaderProps={{
        header: "account",
      }}
      paperBarProps={{
        AllowPrintBtn: true,
        AllowAddBtn: true,
        excelColumns: accountExcelColumns,
        headers: accountHeaders,
        generateDocument: generateAccountDocument,
      }}
      tableProps={{
        columns: accountColumns,
      }}
      // generateDocument={generateAccountDocument}
      {...accountConfig}
    />
  );
};

export default Account;
