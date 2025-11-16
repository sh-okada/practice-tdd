import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
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
  onClick: (formData: LoginFormData) => void;
};

export const LoginForm = ({
  formStatus = { isError: false },
  onClick,
}: Readonly<LoginFormProps>) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <Stack>
      {formStatus.isError && (
        <Alert data-testid="form-status-message" severity="error">
          {formStatus.message}
        </Alert>
      )}
      <TextField
        label="メールアドレス"
        value={formData.email}
        onChange={handleEmailChange}
      />
      <PasswordField
        label="パスワード"
        value={formData.password}
        onChange={handlePasswordChange}
      />
      <Button onClick={() => onClick(formData)}>ログイン</Button>
    </Stack>
  );
};
