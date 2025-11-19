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
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      {formStatus.isError && (
        <Alert severity="error">{formStatus.message}</Alert>
      )}
      <Controller
        name="email"
        control={control}
        rules={loginFormValidationRules.email}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="メールアドレス"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={loginFormValidationRules.password}
        render={({ field, fieldState }) => (
          <PasswordField
            {...field}
            label="パスワード"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        loadingPosition="start"
      >
        ログイン
      </Button>
    </Stack>
  );
};
