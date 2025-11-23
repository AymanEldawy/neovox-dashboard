// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData<T extends z.ZodType<any, any>> = z.infer<T>;

interface FormProps<T extends z.ZodType<any, any>> {
  children: React.ReactNode;
  schema: T;
  onSubmit: (data: FormData<T>) => void;
  defaultValues?: Partial<FormData<T>>;
}

export const FormWrapper = <T extends z.ZodType<any, any>>({
  schema,
  defaultValues = {},
  children,
  onSubmit: handleFormSubmit,
}: FormProps<T>) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData<T>) => {
    handleFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {children}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};