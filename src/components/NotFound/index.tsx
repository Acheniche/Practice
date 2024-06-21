import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>404 ERROR</h1>
      <p>This page not found; back to home and start again</p>
      <button onClick={() => navigate(`/`)}>HOMEPAGE</button>
    </>
  )
}

export default NotFound
