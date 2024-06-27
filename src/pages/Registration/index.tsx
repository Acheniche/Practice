import './index.css'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { auth, registerWithEmailAndPassword } from '../../utils/firebase'
import { ENschema } from './RegistrationShema'

function Registration() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const initialSchema = ENschema

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(initialSchema),
  })

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) {
      navigate('/')
    }
  }, [user, loading, navigate])

  const registerFB = () => {
    if (!name) alert('Please enter name')
    registerWithEmailAndPassword(name, email, password)
  }

  const handleClearName = () => setName('')
  const handleClearEmail = () => setEmail('')
  const handleClearPassword = () => setPassword('')

  return (
    <div>
      <div className="register__container">
        <h1>Registration</h1>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              type="text"
              className="register__textBox"
              value={name}
              {...register('Name')}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            {name && (
              <span className="clear-btn" onClick={handleClearName}>
                ×
              </span>
            )}
          </div>
          <p className="error-message">{errors.Name?.message}</p>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              type="text"
              className="register__textBox"
              value={email}
              {...register('Email')}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            {email && (
              <span className="clear-btn" onClick={handleClearEmail}>
                ×
              </span>
            )}
          </div>
          <p className="error-message">{errors.Email?.message}</p>
        </div>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              type="password"
              className="register__textBox"
              value={password}
              {...register('Password')}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {password && (
              <span className="clear-btn" onClick={handleClearPassword}>
                ×
              </span>
            )}
          </div>
          <p className="error-message">{errors.Password?.message}</p>
        </div>
        <input
          type="submit"
          disabled={!isValid}
          className="register__btn"
          onClick={registerFB}
          value="Send"
        />
        <h1>
          Already have an account? <Link to="/login">Login</Link> now.
        </h1>
      </div>
    </div>
  )
}

export default Registration
