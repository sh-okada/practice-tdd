import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { type SignupFormData, signupFormValidationRules } from "@/libs/rhf";

export const SignupForm = () => {
  const { control } = useForm<SignupFormData>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  return (
    <>
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
    </>
  );
};
