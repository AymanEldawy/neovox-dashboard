// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RHFDatePicker, RHFInput, RHFPasswordInput, RHFSelectField } from "../../fields";
import { userDefaultValues, UserSchema } from "./hooks_useUsersForm";

type UsersFormProps = {
  isUpdate?: boolean;
};

const roleOptions = [
  { id: "user", name: "User" },
  { id: "admin", name: "Admin" },
];

export const UsersForm = ({ isUpdate = false }: UsersFormProps) => {
  const { handleSubmit } = useForm<typeof userDefaultValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: userDefaultValues,
  });

  const onSubmit = (data: any) => {
    // Replace with API call, e.g., createUser(data) or updateUser(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFInput
        name="username"
        label="Username"
        type="text"
      />
      <RHFInput
        name="email"
        label="Email"
        type="email"
      />
      <RHFPasswordInput
        name="password"
        label="Password"
      />
      <RHFSelectField
        name="role"
        label="Role"
        options={roleOptions}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} User
      </button>
    </form>
  );
};