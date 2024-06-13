import { useEffect, useState } from 'react'
import { auth, logInWithEmailAndPassword } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ENschemaLogin } from '../Validation/Shema'
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)
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

  return (
    <div>
      <h1>Login Page</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          {...register('Email')}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={'E-mail Address'}
        />
        <p>{errors.Email?.message}</p>
        <input
          type="password"
          className="login__textBox"
          value={password}
          {...register('Password')}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'Password'}
        />
        <p>{errors.Password?.message}</p>
        <input
          type="submit"
          disabled={!isValid}
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
          value={'Login'}
        />
      </div>
    </div>
  )
}

export default Login
