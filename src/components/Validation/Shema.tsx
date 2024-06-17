import * as yup from 'yup'

export const ENschema = yup.object().shape({
  Name: yup.string().required('Name is required'),
  Email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  Password: yup
    .string()
    // .matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/,
    //   'Password must contain at least 1 number, 1 lowercase letter, and 1 special character'
    // )
    .required('Password is required'),
})

export const ENschemaLogin = yup.object().shape({
  Email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  Password: yup
    .string()
    // .matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/,
    //   'Password must contain at least 1 number, 1 lowercase letter, and 1 special character'
    // )
    .required('Password is required'),
})

//разделить на 2 файла
