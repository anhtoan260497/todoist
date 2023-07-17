import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import loginRoute from "./routes/login";
import appRoute from "./routes/app";
import AppHome from "./pages/AppHome";
import TaskList from "./components/TaskList";
import loginAPI from "./api/loginAPI";
import Cookies from "js-cookie";

const { authIndex, signup, login } = loginRoute;
const { appIndex, today, upcoming } = appRoute;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  //check loggedIn ->  if true : go to app page -> if false redirect to signin page
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await loginAPI.checkLoggedIn(Cookies.get("token"));
        if (res.loggedIn) {
          Cookies.set("token", res.token);
          navigate(`app/${today}`);
        }
      } catch (err) {
        console.log(err);
        window.location = `http://localhost:3000/auth/login`;
      }
    };
    if (
      location.pathname === `/auth/${login}` ||
      location.pathname === `/auth/${signup}`
    )
      return;
    checkLoggedIn();
  }, [navigate, location.pathname]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await loginAPI.checkLoggedIn(Cookies.get("token"));
        if (res.loggedIn) {
          Cookies.set("token", res.token);
          navigate(`app/${today}`);
        }
      } catch (err) {
        console.log(err);
        window.location = `http://localhost:3000/auth/login`;
      }
    }, 600000);
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
