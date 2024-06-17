import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/register.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post('/api/users/register', {name, email, password});
            console.log(data)
            setLoading(false);
            navigate('/login');
        }
        catch(error){
            setLoading(false);
            toast.error("Error Notification !", {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/');
        }
    }, [navigate])

  return (
    <div className='register-page'>
        <form onSubmit={submitHandler}>
            {loading && <Spinner></Spinner>}
            <h1>Register</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="type" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password"/>
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
