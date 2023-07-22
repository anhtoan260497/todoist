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
import TaskDetailModal from "./components/TaskDetailModal";

const { authIndex, signup, login } = loginRoute;
const { appIndex, allTask } = appRoute;

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
          // navigate(`app/task/${allTask}`);
        }
      } catch (err) {
        console.log(err);
        window.location = `${process.env.REACT_APP_TODOIST_MAIN}auth/login`;
      }
    };
    if (
      location.pathname === `/auth/${login}` ||
      location.pathname === `/auth/${signup}`
    )
      return;
    checkLoggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await loginAPI.checkLoggedIn(Cookies.get("token"));
        if (res.loggedIn) {
          Cookies.set("token", res.token);
          navigate(`app/${allTask}`);
        }
      } catch (err) {
        console.log(err);
        window.location = `${process.env.REACT_APP_TODOIST_MAIN}auth/login`;
      }
    }, 600000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={authIndex}>
          <Route path={login} element={<Login isLogin={true} />} />
          <Route path={signup} element={<Login isLogin={false} />} />
        </Route>
        <Route path={appIndex} element={<AppHome />}>
          <Route path="project">
            <Route path="all" element={<TaskList type="project" />}>
              <Route path="task">
                <Route path=":taskId" element={<TaskDetailModal />} />
              </Route>
            </Route>
            <Route path=":id" element={<TaskList type="project" />}>
              <Route path="task">
                <Route path=":taskId" element={<TaskDetailModal />} />
              </Route>
            </Route>
          </Route>
          {/* <Route path="*" element={<Navigate replace to={allTask} />} /> */}
        </Route>
        <Route path="*" element={<Navigate replace to={`auth/${login}`} />} />
      </Routes>
    </div>
  );
}

export default App;
