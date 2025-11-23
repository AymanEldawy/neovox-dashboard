import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RHFDatePicker, RHFInput, RHFSelectField } from "../../fields";
import { userMissionDefaultValues, userMissionSchema, type UserMissionFormData } from "./hooks_useUserMissionsForm";

type UserMissionsFormProps = {
  isUpdate?: boolean;
};

const statusOptions = [
  { id: "active", name: "Active" },
  { id: "completed", name: "Completed" },
  { id: "failed", name: "Failed" },
];

export const UserMissionsForm = ({ isUpdate = false }: UserMissionsFormProps) => {
  const { handleSubmit } = useForm<UserMissionFormData>({
    resolver: zodResolver(userMissionSchema),
    defaultValues: userMissionDefaultValues,
  });

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update User Mission:" : "Create User Mission:", data);
    // Replace with API call, e.g., createUserMission(data) or updateUserMission(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isUpdate && (
        <>
          <RHFInput
            name="userId"
            label="User ID"
            type="text"
          />
          <RHFInput
            name="missionId"
            label="Mission ID"
            type="text"
          />
          <RHFDatePicker
            name="assignedAt"
            label="Assigned At"
          />
        </>
      )}
      <RHFSelectField
        name="status"
        label="Status"
        options={statusOptions}
      />
      <RHFInput
        name="progress"
        label="Progress"
        type="number"
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} User Mission
      </button>
    </form>
  );
};