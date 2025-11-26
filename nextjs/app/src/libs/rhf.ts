import type { RegisterOptions } from "react-hook-form";

export type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormValidationRules = {
  email: RegisterOptions<LoginFormData, "email">;
  password: RegisterOptions<LoginFormData, "password">;
};

export const loginFormValidationRules: LoginFormValidationRules = {
  email: {
    required: "メールアドレスを入力してください",
  },
  password: {
    required: "パスワードを入力してください",
  },
} as const;

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

type SignupFormValidationRules = {
  name: RegisterOptions<SignupFormData, "name">;
  email: RegisterOptions<SignupFormData, "email">;
  password: RegisterOptions<SignupFormData, "password">;
};

export const signupFormValidationRules: SignupFormValidationRules = {
  name: {
    required: "名前を入力してください",
    maxLength: {
      value: 50,
      message: "名前は50文字以内で入力してください",
    },
  },
  email: {
    required: "メールアドレスを入力してください",
  },
  password: {
    required: "パスワードを入力してください",
    minLength: {
      value: 8,
      message: "パスワードは8文字以上で入力してください",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message:
        "パスワードには少なくとも大文字・小文字・数字を1つ以上使用してください",
    },
  },
};
