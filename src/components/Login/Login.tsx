import { useEffect, useState } from 'react'
import { auth, logInWithEmailAndPassword } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ENschemaLogin } from '../Validation/Shema'
import './login.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getAllUsers } from '../../store/reducers/ActionCreators'
import { IUser } from '../../models/IUser'
import { userSlice } from '../../store/reducers/UserSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.getAllUsersReducer)

  const { setUser } = userSlice.actions
  const { User } = useAppSelector((state) => state.userReducer)

  const initialSchema = ENschemaLogin

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(initialSchema),
  })

  useEffect(() => {
    dispatch(getAllUsers())
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) {
      navigate('/')
    }
  }, [user, loading, navigate])

  const submit = (email: string, password: string, users: IUser[]) => {
    users.forEach(async (user) => {
      if (user.email == email && user.password == password) {
        logInWithEmailAndPassword(email, password)
        dispatch(setUser(user))
      }
    })
    if (!User) {
      const err = document.getElementById('Wrong')
      if (err) {
        err.textContent = 'Wrong email or password'
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          {...register('Email')}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={'E-mail Address'}
        />
        <p className="error-message">{errors.Email?.message}</p>
        <input
          type="password"
          className="login__textBox"
          value={password}
          {...register('Password')}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'Password'}
        />
        <p className="error-message">{errors.Password?.message}</p>
        <p className="error-message" id="Wrong"></p>
        <input
          type="submit"
          disabled={!isValid}
          className="login__btn"
          onClick={() => submit(email, password, users)}
          value={'Login'}
        />
      </div>
    </div>
  )
}

export default Login
