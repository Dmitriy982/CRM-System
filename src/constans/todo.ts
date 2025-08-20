interface ITOdoLength {
  minLength: number
  maxLength: number
}

interface IUsernameLength {
  minLength: number
  maxLength: number
}

interface ITOdoLength {
  minLength: number
  maxLength: number
}

export const TodoLength: ITOdoLength = {
  minLength: 2,
  maxLength: 64,
}

export const UsernameLength: IUsernameLength = {
  minLength: 1,
  maxLength: 60,
}

export const LoginLength: IUsernameLength = {
  minLength: 2,
  maxLength: 60,
}

export const PasswordLength: IUsernameLength = {
  minLength: 6,
  maxLength: 60,
}
