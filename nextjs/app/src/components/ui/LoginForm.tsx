import { Alert, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PasswordField } from "@/components/ui";
import { type LoginFormData, loginFormValidationRules } from "@/libs/rhf";

export type LoginFormStatus =
  | { isError: false }
  | { isError: true; message: string };

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
    mode: "onBlur",
  });

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
      {formStatus.isError && (
        <Alert severity="error">{formStatus.message}</Alert>
      )}
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="メールアドレス"
          />
        )}
        rules={loginFormValidationRules.email}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <PasswordField
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="パスワード"
          />
        )}
        rules={loginFormValidationRules.password}
      />
      <Button
        loading={isSubmitting}
        size="large"
        type="submit"
        variant="contained"
      >
        ログイン
      </Button>
    </Stack>
  );
};
