import * as yup from 'yup'

export const ENschema = yup.object().shape({
  Name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter should be uppercase')
    .required('Name is required'),
  Email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  Password: yup
    .string()
    .matches(
      // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/,
      'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required'),
})

export const ENschemaLogin = yup.object().shape({
  Email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  Password: yup
    .string()
    .matches(
      // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/,
      'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required'),
})
