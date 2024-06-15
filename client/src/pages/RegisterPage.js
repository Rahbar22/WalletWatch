import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/register.css'

const RegisterPage = () => {
  return (
    <div className='register-page'>
        <form>
            <h1>Register</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="type" className="form-control" id="name" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="row py-3">
            <Link to="/login">
            Already a user ? Click Here to Login !
            </Link>
        </div>
    </div>
  )
}

export default RegisterPage
