import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput } from '../../types/formInput'
import { ENschemaContact } from './ContactShema'
import './index.css'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(ENschemaContact),
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    emailjs
      .send(
        'service_hnhnuci',
        'template_rm5gw5m',
        data as unknown as Record<string, unknown>,
        'aw42ftbiphnnYM1Py'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div>
          <input {...register('firstName')} placeholder="First name" />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register('lastName')} placeholder="Last name" />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('subject')} placeholder="Subject" />
          {errors.subject && <p>{errors.subject.message}</p>}
        </div>
        <div>
          <textarea {...register('message')} placeholder="Message" />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default Contact
