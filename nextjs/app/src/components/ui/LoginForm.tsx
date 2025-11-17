import { Alert, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PasswordField } from "@/components/ui";

export type LoginFormStatus =
  | { isError: false }
  | { isError: true; message: string };

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  formStatus?: LoginFormStatus;
  onSubmit: (formData: LoginFormData) => void;
};

export const LoginForm = ({
  formStatus = { isError: false },
  onSubmit,
}: Readonly<LoginFormProps>) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      {formStatus.isError && (
        <Alert data-testid="form-status-message" severity="error">
          {formStatus.message}
        </Alert>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField {...field} label="メールアドレス" />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <PasswordField {...field} label="パスワード" />}
      />
      <Button type="submit" loading={isSubmitting}>
        ログイン
      </Button>
    </Stack>
  );
};
