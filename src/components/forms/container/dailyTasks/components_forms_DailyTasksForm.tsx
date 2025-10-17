import { useCreateDailyTaskForm, useUpdateDailyTaskForm } from "../../hooks/useDailyTasksForm";
import { RHFInput, RHFTextarea, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type DailyTasksFormProps = {
  isUpdate?: boolean;
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export const DailyTasksForm = ({ isUpdate = false }: DailyTasksFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateDailyTaskForm()
    : useCreateDailyTaskForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Daily Task:" : "Create Daily Task:", data);
    // Replace with API call, e.g., createDailyTask(data) or updateDailyTask(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isUpdate && (
        <RHFInput
          name="userId"
          label="User ID"
          type="text"
          register={register}
          error={errors.userId?.message}
        />
      )}
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
      <RHFDatePicker
        name="dueDate"
        label="Due Date"
        register={register}
        error={errors.dueDate?.message}
      />
      <RHFSelectField
        name="status"
        label="Status"
        options={statusOptions}
        register={register}
        error={errors.status?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Daily Task
      </button>
    </form>
  );
};