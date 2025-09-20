import { useCreateBadgeForm, useUpdateBadgeForm } from "../../hooks/useBadgesForm";
import { RHFInput, RHFTextarea, RHFDatePicker } from "../../components/RHFComponents";

type BadgesFormProps = {
  isUpdate?: boolean;
};

export const BadgesForm = ({ isUpdate = false }: BadgesFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateBadgeForm()
    : useCreateBadgeForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Badge:" : "Create Badge:", data);
    // Replace with API call, e.g., createBadge(data) or updateBadge(id, data)
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
        name="imageUrl"
        label="Image URL"
        type="text"
        register={register}
        error={errors.imageUrl?.message}
      />
      <RHFTextarea
        name="criteria"
        label="Criteria"
        register={register}
        error={errors.criteria?.message}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
        register={register}
        error={errors.createdAt?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Badge
      </button>
    </form>
  );
};