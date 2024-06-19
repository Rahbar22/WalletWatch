import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'

const LoginPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post('/api/users/login', {email, password});
            console.log(data)
            localStorage.setItem(
                "user",
                JSON.stringify(data)
              );
              message.success("Login success");
            setLoading(false);
            navigate('/');
        }
        catch(error){
            message.error("Something went wrong");
            setLoading(false);
        }
    }

    
  return (
    <div className='login-page'>
        <form onSubmit={submitHandler}>
            {loading && <Spinner></Spinner>}
            <h1>Login</h1>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
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
