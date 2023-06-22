import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import loginRoute from './routes/login';
import appRoute from './routes/app';
import AppHome from './pages/AppHome';


const {signup, login} = loginRoute
const {index} = appRoute


function App() {

  return (
    <div className="App">
       <Routes>
        <Route path={login} element={<Login isLogin={true} />} />
        <Route path={signup} element={<Login isLogin={false} />} />
        <Route path={index} element={<AppHome />} />
        <Route path="*" element={ <Navigate replace to={login} />} />
       </Routes>

    </div>
  );
}

export default App;
