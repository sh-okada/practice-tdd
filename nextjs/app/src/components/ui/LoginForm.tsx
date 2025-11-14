import { Button, Stack, TextField } from "@mui/material";
import { type ChangeEvent, useState } from "react";
import { PasswordField } from "@/components/ui";

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onClick: (formData: FormData) => void;
};

export const LoginForm = ({ onClick }: LoginFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <Stack>
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
