import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import loginRoute from './routes/login';

const {signup, login} = loginRoute
console.log(loginRoute)

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path={login} element={<Login isLogin={true} />} />
        <Route path={signup} element={<Login isLogin={false} />} />
       </Routes>
    </div>
  );
}

export default App;
