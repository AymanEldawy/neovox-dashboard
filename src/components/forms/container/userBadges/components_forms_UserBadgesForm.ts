import { useCreateUserBadgeForm, useUpdateUserBadgeForm } from "../../hooks/useUserBadgesForm";
import { RHFInput, RHFDatePicker } from "../../components/RHFComponents";

type UserBadgesFormProps = {
  isUpdate?: boolean;
};

export const UserBadgesForm = ({ isUpdate = false }: UserBadgesFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateUserBadgeForm()
    : useCreateUserBadgeForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update User Badge:" : "Create User Badge:", data);
    // Replace with API call, e.g., createUserBadge(data) or updateUserBadge(id, data)
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
            name="badgeId"
            label="Badge ID"
            type="text"
            register={register}
            error={errors.badgeId?.message}
          />
        </>
      )}
      <RHFDatePicker
        name="awardedAt"
        label="Awarded At"
        register={register}
        error={errors.awardedAt?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} User Badge
      </button>
    </form>
  );
};