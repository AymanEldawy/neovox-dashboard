import { useCreateMissionForm, useUpdateMissionForm } from "../../hooks/useMissionsForm";
import { RHFInput, RHFTextarea, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type MissionsFormProps = {
  isUpdate?: boolean;
};

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const MissionsForm = ({ isUpdate = false }: MissionsFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateMissionForm()
    : useCreateMissionForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Mission:" : "Create Mission:", data);
    // Replace with API call, e.g., createMission(data) or updateMission(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFInput
        name="title"
        label="Title"
        type="text"
        register={register}
        error={errors.title?.message}
      />
      <RHFTextarea
        name="description"
        label="Description"
        register={register}
        error={errors.description?.message}
      />
      <RHFInput
        name="reward"
        label="Reward"
        type="number"
        register={register}
        error={errors.reward?.message}
      />
      <RHFSelectField
        name="difficulty"
        label="Difficulty"
        options={difficultyOptions}
        register={register}
        error={errors.difficulty?.message}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
        register={register}
        error={errors.createdAt?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Mission
      </button>
    </form>
  );
};