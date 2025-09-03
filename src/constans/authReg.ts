interface MinMaxLength {
  minLength: number
  maxLength: number
}

export const UsernameLength: MinMaxLength = {
  minLength: 1,
  maxLength: 60,
}

export const LoginLength: MinMaxLength = {
  minLength: 2,
  maxLength: 60,
}

export const PasswordLength: MinMaxLength = {
  minLength: 6,
  maxLength: 60,
}
