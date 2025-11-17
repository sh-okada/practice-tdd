export type LoginFormData = {
  email: string;
  password: string;
};
export const loginFormValidationRules = {
  email: {
    required: "メールアドレスを入力してください",
  },
  password: {
    required: "パスワードを入力してください",
  },
} as const;
