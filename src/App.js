import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import loginRoute from "./routes/login";
import appRoute from "./routes/app";
import AppHome from "./pages/AppHome";
import EmptyTaskToday from "./components/EmptyTaskToday";
import TaskList from "./components/TaskList";
import { useEffect } from "react";
import loginAPI from "./api/loginAPI";
import Cookies from "js-cookie";

const { authIndex, signup, login } = loginRoute;
const { appIndex, today, upcoming } = appRoute;

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    
    const checkLoggedIn = async () => {
      try {
        const res = await loginAPI.checkLoggedIn(Cookies('token'));
        if (res.loggedIn) navigate(`app/${today}`)
      } catch (err) {
        // navigate(`auth/${login}`)
      }
    };
    checkLoggedIn();
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path={authIndex}>
          <Route path={login} element={<Login isLogin={true} />} />
          <Route path={signup} element={<Login isLogin={false} />} />
        </Route>
        <Route path={appIndex} element={<AppHome />}>
          <Route path={today} element={<TaskList />} />
          <Route path={upcoming} element={<TaskList />} />
          <Route path="*" element={<Navigate replace to={today} />} />
        </Route>
        <Route path="*" element={<Navigate replace to={`auth/${login}`} />} />
      </Routes>
    </div>
  );
}

export default App;
