import { useCreateUserForm, useUpdateUserForm } from "../../hooks/useUsersForm";
import { RHFInput, RHFPasswordInput, RHFSelectField, RHFDatePicker } from "../../components/RHFComponents";

type UsersFormProps = {
  isUpdate?: boolean;
};

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const UsersForm = ({ isUpdate = false }: UsersFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateUserForm()
    : useCreateUserForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update User:" : "Create User:", data);
    // Replace with API call, e.g., createUser(data) or updateUser(id, data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFInput
        name="username"
        label="Username"
        type="text"
        register={register}
        error={errors.username?.message}
      />
      <RHFInput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <RHFPasswordInput
        name="password"
        label="Password"
        register={register}
        error={errors.password?.message}
      />
      <RHFSelectField
        name="role"
        label="Role"
        options={roleOptions}
        register={register}
        error={errors.role?.message}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
        register={register}
        error={errors.createdAt?.message}
      />
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} User
      </button>
    </form>
  );
};