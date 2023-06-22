import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import loginRoute from "./routes/login";
import appRoute from "./routes/app";
import AppHome from "./pages/AppHome";
import EmptyTaskToday from "./components/EmptyTaskToday";

const { authIndex, signup, login } = loginRoute;
const { appIndex, today } = appRoute;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={authIndex}>
          <Route path={login} element={<Login isLogin={true} />} />
          <Route path={signup} element={<Login isLogin={false} />} />
        </Route>
        <Route path={appIndex} element={<AppHome />}>
          <Route path={today} element={<EmptyTaskToday />} />
        </Route>
        <Route path="*" element={<Navigate replace to={`auth/${login}`} />} />
      </Routes>
    </div>
  );
}

export default App;
