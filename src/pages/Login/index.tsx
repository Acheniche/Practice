import './index.css'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { auth, logInWithEmailAndPassword } from '../../utils/firebase'
import { ENschemaLogin } from './validation'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const initialSchema = ENschemaLogin

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

  const handleClearEmail = () => setEmail('')
  const handleClearPassword = () => setPassword('')

  const handleLogin = async () => {
    setError(null)
    await logInWithEmailAndPassword(email, password, setError)
  }

  return (
    <div>
      <div className="login__container">
        <h1>Login</h1>
        <div className="input-wrapper">
          <div className="input-container">
            <input
              type="text"
              className="login__textBox"
              value={email}
              {...register('Email')}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'E-mail Address'}
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
              className="login__textBox"
              value={password}
              {...register('Password')}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'Password'}
            />
            {password && (
              <span className="clear-btn" onClick={handleClearPassword}>
                ×
              </span>
            )}
          </div>
          <p className="error-message">{errors.Password?.message}</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <input
          type="submit"
          disabled={!isValid}
          className="login__btn"
          onClick={handleLogin}
          value={'Login'}
        />
      </div>
    </div>
  )
}

export default Login
