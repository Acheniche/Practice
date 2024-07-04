import './index.css'

import emailjs from '@emailjs/browser'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormInput } from './types'
import { ENschemaContact } from './validation'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    mode: 'all',
    resolver: yupResolver(ENschemaContact),
  })

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    emailjs
      .send(
        'service_hnhnuci',
        'template_rm5gw5m',
        data as unknown as Record<string, unknown>,
        'aw42ftbiphnnYM1Py'
      )
      .then(
        () => {
          setFeedbackMessage('Message sent successfully!')
          setIsError(false)
        },
        () => {
          setFeedbackMessage('Failed to send the message. Please try again.')
          setIsError(true)
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
        {feedbackMessage && (
          <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
            {feedbackMessage}
          </p>
        )}
      </form>
    </div>
  )
}

export default Contact
