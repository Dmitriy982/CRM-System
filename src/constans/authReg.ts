interface AuthValuesLength {
  minLength: number
  maxLength: number
}

export const UsernameLength: AuthValuesLength = {
  minLength: 1,
  maxLength: 60,
}

export const LoginLength: AuthValuesLength = {
  minLength: 2,
  maxLength: 60,
}

export const PasswordLength: AuthValuesLength = {
  minLength: 6,
  maxLength: 60,
}
