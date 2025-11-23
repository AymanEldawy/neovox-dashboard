// @ts-nocheck
import { useCreateUserInvestmentForm, useUpdateUserInvestmentForm } from "../../hooks/useUserInvestmentsForm";
import { RHFInput, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type UserInvestmentsFormProps = {
  isUpdate?: boolean;
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

export const UserInvestmentsForm = ({ isUpdate = false }: UserInvestmentsFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateUserInvestmentForm()
    : useCreateUserInvestmentForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update User Investment:" : "Create User Investment:", data);
    // Replace with API call, e.g., createUserInvestment(data) or updateUserInvestment(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isUpdate && (
        <>
          <RHFInput
            name="userId"
            label="User ID"
            type="text"
            register={register}
            error={errors.userId?.message}
          />
          <RHFInput
            name="planId"
            label="Plan ID"
            type="text"
            register={register}
            error={errors.planId?.message}
          />
          <RHFDatePicker
            name="investedAt"
            label="Invested At"
            register={register}
            error={errors.investedAt?.message}
          />
        </>
      )}
      <RHFInput
        name="amount"
        label="Amount"
        type="number"
        register={register}
        error={errors.amount?.message}
      />
      <RHFSelectField
        name="status"
        label="Status"
        options={statusOptions}
        register={register}
        error={errors.status?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} User Investment
      </button>
    </form>
  );
};