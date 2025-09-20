import { useCreateNotificationForm, useUpdateNotificationForm } from "../../hooks/useNotificationsForm";
import { RHFInput, RHFTextarea, RHFSelectField, RHFDatePicker, RHFCheckbox } from "../../components/RHFComponents";

type NotificationsFormProps = {
  isUpdate?: boolean;
};

const notificationTypeOptions = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
];

export const NotificationsForm = ({ isUpdate = false }: NotificationsFormProps) => {
  const { register, handleSubmit, formState: { errors } } = isUpdate
    ? useUpdateNotificationForm()
    : useCreateNotificationForm();

  const onSubmit = (data: any) => {
    console.log(isUpdate ? "Update Notification:" : "Create Notification:", data);
    // Replace with API call, e.g., createNotification(data) or updateNotification(id, data)
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
        name="message"
        label="Message"
        register={register}
        error={errors.message?.message}
      />
      <RHFInput
        name="recipientId"
        label="Recipient ID"
        type="text"
        register={register}
        error={errors.recipientId?.message}
      />
      <RHFSelectField
        name="type"
        label="Type"
        options={notificationTypeOptions}
        register={register}
        error={errors.type?.message}
      />
      <RHFDatePicker
        name="createdAt"
        label="Created At"
        register={register}
        error={errors.createdAt?.message}
      />
      {isUpdate && (
        <RHFCheckbox
          name="read"
          label="Read"
          register={register}
          error={errors.read?.message}
        />
      )}
      <button type="submit" className="btn">
        {isUpdate ? "Update" : "Create"} Notification
      </button>
    </form>
  );
};