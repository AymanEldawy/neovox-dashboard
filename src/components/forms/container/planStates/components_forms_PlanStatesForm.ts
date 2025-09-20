import { useCreatePlanStateForm, useUpdatePlanStateForm } from "../../hooks/usePlanStatesForm";
import { RHFInput, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type PlanStatesFormProps = {
  isUpdate?: boolean;
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

export const PlanStatesForm = ({ isUpdate = false }: PlanStatesFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdatePlanStateForm()
    : useCreatePlanStateForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Plan State:" : "Create Plan State:", data);
    // Replace with API call, e.g., createPlanState(data) or updatePlanState(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isUpdate && (
        <RHFInput
          name="planId"
          label="Plan ID"
          type="text"
          register={register}
          error={errors.planId?.message}
        />
      )}
      <RHFSelectField
        name="status"
        label="Status"
        options={statusOptions}
        register={register}
        error={errors.status?.message}
      />
      {!isUpdate && (
        <RHFDatePicker
          name="updatedAt"
          label="Updated At"
          register={register}
          error={errors.updatedAt?.message}
        />
      )}
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Plan State
      </button>
    </form>
  );
};