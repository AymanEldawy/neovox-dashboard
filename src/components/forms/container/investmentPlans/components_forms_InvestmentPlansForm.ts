import { useCreateInvestmentPlanForm, useUpdateInvestmentPlanForm } from "../../hooks/useInvestmentPlansForm";
import { RHFInput, RHFTextarea, RHFDatePicker } from "../../components/RHFComponents";

type InvestmentPlansFormProps = {
  isUpdate?: boolean;
};

export const InvestmentPlansForm = ({ isUpdate = false }: InvestmentPlansFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateInvestmentPlanForm()
    : useCreateInvestmentPlanForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Investment Plan:" : "Create Investment Plan:", data);
    // Replace with API call, e.g., createInvestmentPlan(data) or updateInvestmentPlan(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFInput
        name="name"
        label="Name"
        type="text"
        register={register}
        error={errors.name?.message}
      />
      <RHFTextarea
        name="description"
        label="Description"
        register={register}
        error={errors.description?.message}
      />
      <RHFInput
        name="minAmount"
        label="Minimum Amount"
        type="number"
        register={register}
        error={errors.minAmount?.message}
      />
      <RHFInput
        name="maxAmount"
        label="Maximum Amount"
        type="number"
        register={register}
        error={errors.maxAmount?.message}
      />
      <RHFInput
        name="returnRate"
        label="Return Rate"
        type="number"
        register={register}
        error={errors.returnRate?.message}
      />
      <RHFInput
        name="duration"
        label="Duration"
        type="number"
        register={register}
        error={errors.duration?.message}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
        register={register}
        error={errors.createdAt?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Investment Plan
      </button>
    </form>
  );
};