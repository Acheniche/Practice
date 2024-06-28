import './index.css'

import emailjs from '@emailjs/browser'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import logo1 from '../../assets/Icon color (2).svg'
import logo2 from '../../assets/Icon color (3).svg'
import logo3 from '../../assets/Icon color (4).svg'
import logo5 from '../../assets/Icon color (6).svg'
import { FooterFormInput } from './types/footerFormInput'
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

  const onSubmit: SubmitHandler<FooterFormInput> = (data) => {
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
    <footer className="footer">
      <div className="footer__top">
        <div className="left-section">
          <a href="#">CONTACT</a>
          <a href="#">TERMS OF SERVICES</a>
          <a href="#">SHIPPING AND RETURNS</a>
        </div>
        <div className="right-section">
          <form onSubmit={handleSubmit(onSubmit)} className="footer-form">
            <div className="input-container">
              <input
                {...register('email')}
                placeholder="Give an email, get the newsletter."
                className="contact__textBox"
              />
              <button type="submit" disabled={!isValid} className="footer__btn">
                →
              </button>
            </div>
            <p className="error-message">{errors.email?.message}</p>
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="copyright">
          © 2023 Shelly. Terms of use and privacy policy.
        </div>
        <div className="social-icons">
          <a href="#">
            <img src={logo1} alt="LinkedIn" />
          </a>
          <a href="#">
            <img src={logo5} alt="Facebook" />
          </a>
          <a href="#">
            <img src={logo3} alt="Instagram" />
          </a>
          <a href="#">
            <img src={logo2} alt="Twitter" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
