import * as yup from 'yup'

export const ENschemaLogin = yup.object().shape({
  Email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  Password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/,
      'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required'),
})
