import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, TextField, type TextFieldProps } from "@mui/material";
import { useState } from "react";

export type PasswordFieldProps = TextFieldProps;

export const PasswordField = ({ slotProps, ...rest }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              aria-label={
                showPassword
                  ? "パスワードを非表示にする"
                  : "パスワードを表示する"
              }
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          ),
        },
        ...slotProps,
      }}
      {...rest}
    />
  );
};
