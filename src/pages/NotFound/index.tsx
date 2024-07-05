import './index.css'

import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="Error-container">
      <h1>404 ERROR</h1>
      <p>This page not found;</p>
      <p>back to home and start again</p>
      <button onClick={() => navigate(`/`)}>HOMEPAGE</button>
    </div>
  )
}

export default NotFound
