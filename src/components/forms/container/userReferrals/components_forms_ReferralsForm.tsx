// @ts-nocheck
import { useCreateReferralForm, useUpdateReferralForm } from "../../hooks/useReferralsForm";
import { RHFInput, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type ReferralsFormProps = {
  isUpdate?: boolean;
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export const ReferralsForm = ({ isUpdate = false }: ReferralsFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateReferralForm()
    : useCreateReferralForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Referral:" : "Create Referral:", data);
    // Replace with API call, e.g., createReferral(data) or updateReferral(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isUpdate && (
        <>
          <RHFInput
            name="referrerId"
            label="Referrer ID"
            type="text"
            register={register}
            error={errors.referrerId?.message}
          />
          <RHFInput
            name="referredId"
            label="Referred ID"
            type="text"
            register={register}
            error={errors.referredId?.message}
          />
          <RHFDatePicker
            name="createdAt"
            label="Created At"
            register={register}
            error={errors.createdAt?.message}
          />
        </>
      )}
      <RHFSelectField
        name="status"
        label="Status"
        options={statusOptions}
        register={register}
        error={errors.status?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Referral
      </button>
    </form>
  );
};