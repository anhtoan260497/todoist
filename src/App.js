import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import loginRoute from './routes/login';
import { redirect } from "react-router-dom";
import { useEffect } from 'react';


const {signup, login} = loginRoute


function App() {

  
  return (
    <div className="App">
       <Routes>
        <Route path={login} element={<Login isLogin={true} />} />
        <Route path={signup} element={<Login isLogin={false} />} />
        <Route path="*" element={ <Navigate replace to={login} />} />
       </Routes>

    </div>
  );
}

export default App;
