import './App.css';
import { useContext } from 'react';
import AuthContext from './context/userContext';
import Auth from './components/Auth';
import Profile from './components/Profile'
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  let authCtx = useContext(AuthContext)
  console.log(authCtx)

  return (
    <div className="">
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/profile' element={authCtx.token ? <Profile/> : <Navigate to='/'/>} />
    </Routes>
    </div>
  );
}

export default App;
