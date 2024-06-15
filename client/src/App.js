import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='register' element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
