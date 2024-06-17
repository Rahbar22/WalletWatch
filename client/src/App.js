import './App.css';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <ProtectedRoutes>
            <HomePage></HomePage>
          </ProtectedRoutes>
        }></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </Router>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children;
  }
  else{
    return <Navigate to = '/login'></Navigate>;
  }
}

export default App;
