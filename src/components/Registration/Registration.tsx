import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth, registerWithEmailAndPassword } from '../Login/firebase'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ENschema } from '../Validation/Shema'
import './registration.css'

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

  return (
    <div>
      <h1>Registration</h1>
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          {...register('Name')}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <p className="error-message">{errors.Name?.message}</p>
        <input
          type="text"
          className="register__textBox"
          value={email}
          {...register('Email')}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <p className="error-message">{errors.Email?.message}</p>
        <input
          type="password"
          className="register__textBox"
          value={password}
          {...register('Password')}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <p className="error-message">{errors.Password?.message}</p>
        <input
          type="submit"
          disabled={!isValid}
          className="register__btn"
          onClick={registerFB}
          value="Send"
        />
      </div>
      <div>
        <h2>
          Already have an account? <Link to="/login">Login</Link> now.
        </h2>
      </div>
    </div>
  )
}

export default Registration
