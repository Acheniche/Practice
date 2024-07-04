import './index.css'

import emailjs from '@emailjs/browser'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import logo1 from '../../assets/Icon color (2).svg'
import logo2 from '../../assets/Icon color (3).svg'
import logo3 from '../../assets/Icon color (4).svg'
import logo5 from '../../assets/Icon color (6).svg'
import { FooterFormInput } from './types'
import { ENschemaFooter } from './validation'

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FooterFormInput>({
    mode: 'all',
    resolver: yupResolver(ENschemaFooter),
  })

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FooterFormInput> = (data) => {
    emailjs
      .send(
        'service_hnhnuci',
        'template_vedvmbb',
        data as unknown as Record<string, unknown>,
        'aw42ftbiphnnYM1Py'
      )
      .then(
        () => {
          setFeedbackMessage('Message sent successfully!')
          setIsError(false)
          setTimeout(() => setFeedbackMessage(null), 3000)
        },
        () => {
          setFeedbackMessage('Failed to send the message. Please try again.')
          setIsError(true)
          setTimeout(() => setFeedbackMessage(null), 3000)
        }
      )
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="left-section">
          <a>
            <Link to="/contact">CONTACT</Link>
          </a>
          <a>
            <Link to="/">TERMS OF SERVICES</Link>
          </a>
          <a>
            <Link to="/">SHIPPING AND RETURNS</Link>
          </a>
        </div>
        <div className="right-section">
          <form onSubmit={handleSubmit(onSubmit)} className="footer-form">
            <div className="input-container">
              <input
                {...register('emailFooter')}
                placeholder="Give an email, get the newsletter."
                className="footer__textBox"
              />
              <button type="submit" disabled={!isValid} className="footer__btn">
                →
              </button>
            </div>
            <p className="error-message">{errors.emailFooter?.message}</p>
            {feedbackMessage && (
              <p
                className={`feedback-message ${isError ? 'error' : 'success'}`}
              >
                {feedbackMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="copyright">
          © 2023 Shelly. Terms of use and privacy policy.
        </div>
        <div className="social-icons">
          <a>
            <Link to="/">
              <img src={logo1} alt="LinkedIn" />
            </Link>
          </a>
          <a>
            <Link to="/">
              <img src={logo5} alt="Facebook" />
            </Link>
          </a>
          <a>
            <Link to="/">
              <img src={logo3} alt="Instagram" />
            </Link>
          </a>
          <a>
            <Link to="/">
              <img src={logo2} alt="Twitter" />
            </Link>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
