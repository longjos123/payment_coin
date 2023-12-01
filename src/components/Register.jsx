import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerWithEmailAndPassword, logout } from '../firebase'
import { signInWithCometChat } from '../cometChat'
import { setAlert } from '../store'
import '../assets/css/register/main.css'

const Register = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (
      email == '' ||
      password == '' ||
      fullname == '' ||
      phone == '' ||
      account == '' ||
      address == ''
    )
      return
    registerWithEmailAndPassword(
      email,
      password,
      fullname,
      phone,
      account,
      address
    ).then((user) => {
      if (user) {
        logout().then(() => {
          signInWithCometChat(user.uid, fullname).then(() => {
            resetForm()
            setAlert('Registeration in successfully')
            navigate('/signin')
          })
        })
      }
    })
  }

  const resetForm = () => {
    setFullname('')
    setEmail('')
    setPassword('')
    setPhone('')
    setAccount('')
    setAddress('')
  }

  return (
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-body">
            <h2 className="title">Registration Form</h2>
            <form method="POST" onSubmit={handleRegister}>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label float-left">Full name</label>
                    <input
                      className="input--style-4"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      name="fullname"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label float-left">Email</label>
                    <input
                      className="input--style-4"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email" name="email" />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label float-left">Wallet Address</label>
                    <input
                      className="input--style-4"
                      type="text"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      name="wallet_address" />
                  </div>
                </div>

                <div className="col-2">
                  <div className="input-group">
                    <label className="label float-left">Phone Number</label>
                    <input
                      className="input--style-4"
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone" />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label float-left">Address</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input--style-4"
                      type="text"
                      name="address" />
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="p-t-15">
                <button className="btn btn--radius-2 btn--blue" type="submit">
                  Submit
                </button>
              </div>
              <div className="pt-4">
                <a className="txt2" href="/signin">
                  Back to login
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
