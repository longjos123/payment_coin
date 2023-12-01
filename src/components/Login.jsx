import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logInWithEmailAndPassword } from '../firebase'
import { loginWithCometChat } from '../cometChat'
import { setAlert, setGlobalState } from '../store'
import '../assets/css/login/main.css'
import '../assets/css/login/util.css'
import imageLogin from '../assets/images/img-01.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email == '' || password == '') return
    logInWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        loginWithCometChat(user.uid).then(() => {
          resetForm()
          setAlert('Logged in successfully')
          navigate('/')
        })
      }
    })
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt="">
            <img src={imageLogin} alt="IMG" />
          </div>
          <form onSubmit={ handleLogin } className="login100-form validate-form">
            <span className="login100-form-title">Login</span>
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="Email"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Password"
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>
            <div className="text-center p-t-136">
              <a className="txt2" href="/signup">
                Create your Account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
