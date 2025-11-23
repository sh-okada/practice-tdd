import { type FieldValues, type UseFormProps, useForm } from "react-hook-form";

export type FormStatus =
  | { isError: false }
  | { isError: true; message: string };

export type BaseFormProps<T extends FieldValues> = {
  formStatus?: FormStatus;
  onSubmit: (formData: T) => void;
  rhfProps: UseFormProps<T>;
};

export const BaseForm = <T extends FieldValues>({
  rhfProps,
}: BaseFormProps<T>) => {
  const _form = useForm<T>(rhfProps);

  return null;
};
