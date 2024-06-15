import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'

const LoginPage = () => {
  return (
    <div className='login-page'>
        <form>
            <h1>Login</h1>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="row py-3">
            <Link to="/register">
            Not a user ? Click Here to regsiter!
            </Link>
        </div>
    </div>
  )
}

export default LoginPage
