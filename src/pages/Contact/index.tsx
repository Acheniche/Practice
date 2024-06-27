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
    formState: { errors, isValid },
  } = useForm<FormInput>({
    mode: 'all',
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
    <div className="contact__container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="input-wrapper">
          <div className="input-container">
            <input
              {...register('firstName')}
              placeholder="First name"
              className="contact__textBox"
            />
            <p className="error-message">{errors.firstName?.message}</p>
          </div>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              {...register('lastName')}
              placeholder="Last name"
              className="contact__textBox"
            />
            <p className="error-message">{errors.lastName?.message}</p>
          </div>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              {...register('email')}
              placeholder="Email"
              className="contact__textBox"
            />
            <p className="error-message">{errors.email?.message}</p>
          </div>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              {...register('subject')}
              placeholder="Subject"
              className="contact__textBox"
            />
            <p className="error-message">{errors.subject?.message}</p>
          </div>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <textarea
              {...register('message')}
              placeholder="Message"
              className="contact__textBox"
            />
            <p className="error-message">{errors.message?.message}</p>
          </div>
        </div>
        <input
          type="submit"
          disabled={!isValid}
          className="contact__btn"
          value="Send"
        />
      </form>
    </div>
  )
}

export default Contact
