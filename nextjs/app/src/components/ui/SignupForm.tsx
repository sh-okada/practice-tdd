import { Alert, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { type SignupFormData, signupFormValidationRules } from "@/libs/rhf";

export type SignupFormStatus =
  | { isError: false }
  | { isError: true; message: string };

export type SignupFormProps = {
  formStatus?: SignupFormStatus;
  onSubmit: (formData: SignupFormData) => void;
};

export const SignupForm = ({
  formStatus = { isError: false },
  onSubmit,
}: SignupFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>({
    mode: "onBlur",
  });

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
      {formStatus.isError && (
        <Alert severity="error">{formStatus.message}</Alert>
      )}
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="名前"
            {...field}
          />
        )}
        rules={signupFormValidationRules.name}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="メールアドレス"
            {...field}
          />
        )}
        rules={signupFormValidationRules.email}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="パスワード"
            {...field}
          />
        )}
        rules={signupFormValidationRules.password}
      />
      <Button
        loading={isSubmitting}
        size="large"
        type="submit"
        variant="contained"
      >
        登録
      </Button>
    </Stack>
  );
};
