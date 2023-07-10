import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Spin, Typography } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginRoute from "../../routes/login";
import { customRegex } from "../../helper";
import loginAPI from "../../api/loginAPI";
import SocialLoginButton from "../../components/SocialLoginButton";
import Cookies from "js-cookie";
import appRoute from "../../routes/app";
import Toast from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setToastType, setToastMessage } from "../../features/toast/toastSlice";
import { setIsLoading } from "../../features/login/loginSlice";

const { Title } = Typography;
const { signup, login } = loginRoute;

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

function Login({ isLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastType = useSelector((state) => state.toastReducer.toastType);
  const isLoadingLogin = useSelector((state) => state.loginReducer.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form
  const loginSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      let loginData = {
        email: data.email,
        password: data.password,
      };
      const res = await loginAPI.login(loginData);
      if (res.loggedIn) {
        Cookies.set("token", res.token);
        dispatch(setToastType("success"));
        dispatch(setToastMessage("Success"));
        window.location = `http://localhost:3000/app/${appRoute.today}`;
      }
      dispatch(setIsLoading(false));
    } catch (err) {
      dispatch(setToastType("error"));
      dispatch(setToastMessage(err.response.data.status));
      setTimeout(() => {
        dispatch(
          setToastType({
            toastType: "",
          })
        );
      }, 500);
      dispatch(setIsLoading(false));
    }
  };

  const registerSubmit = async (data) => {
    const registerData = {
      email: data.email,
      password: data.password,
    };
    try {
      setIsLoading(true)
      const res = await loginAPI.createAccount(registerData)
      if(res.status === 200) {
        dispatch(setToastType("success"));
        dispatch(setToastMessage(res.message));
        navigate('/auth/login')
      }
      setIsLoading(false)
    } catch (err) {
      dispatch(setToastType("error"));
      dispatch(setToastMessage(err.response.data.status));
      setTimeout(() => {
        dispatch(
          setToastType({
            toastType: "",
          })
        );
      }, 500);
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className="login-container">
      <div className="left-form">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/svg/icon.svg"}
          alt=""
        />
        <Toast type={toastType} />
        <div className="login-area">
          <Title level={2}>{!isLogin ? "Sign up" : "Login"}</Title>
          <SocialLoginButton type="facebook" />
          <SocialLoginButton type="google" />
          <SocialLoginButton type="apple" />

          <form onSubmit={isLogin  ? handleSubmit(loginSubmit) : handleSubmit(registerSubmit)}>
            <div className="input-area">
              <label>Email</label>
              <input
                className="input-field"
                {...register("email", {
                  required: true,
                  validate: (value) => customRegex(value, "email"),
                })}
                placeholder="Enter your email..."
              />
              {errors.email && <p className="form-error">Email is required</p>}
            </div>

            <div className="input-area">
              <label>Password</label>
              <input
                className="input-field"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 60,
                })}
                type="password"
                placeholder="Enter your password..."
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <p className="form-error">Password is required</p>
              )}
            </div>

            {!isLoadingLogin ? (
              <input
                className="input-submit"
                type="submit"
                value={!isLogin ? "Sign up with Email" : "Login"}
              />
            ) : (
              <button className="input-submit">
                <Spin />
              </button>
            )}
          </form>
        </div>

        <div className="term">
          By continuing with Email, you agree to Todoist’s <br />
          <a href="https://todoist.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
          and
          <a
            href="https://todoist.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </div>

        <div className="clear"></div>

        <p className="login-more">
          {!isLogin ? (
            <>
              Already signed up? <Link to={`/auth/${login}`}>Go to login</Link>{" "}
            </>
          ) : (
            <>
              Don’t have an account? <Link to={`/auth/${signup}`}>Sign up</Link>
            </>
          )}
        </p>
      </div>

      <div className="right-form">
        <div className="image-item">
          <img
            className="image-item-size"
            src="https://todoist.b-cdn.net/assets/images/ae01c415678c90d0c606bc6917758502.jpg"
            alt="over"
          />
          <h3 className="image-item-title">30 milion+</h3>
          <p className="image-item-description">app downloads</p>
        </div>

        <div className="image-item">
          <img
            className="image-item-size"
            src="https://todoist.b-cdn.net/assets/images/573fa908fbccdf1600f90f16a0c2e311.jpg"
            alt="over"
          />
          <h3 className="image-item-title">15 years+</h3>
          <p className="image-item-description">in business</p>
        </div>

        <div className="image-item">
          <img
            className="image-item-size"
            src="https://todoist.b-cdn.net/assets/images/87ded242639ba32ef4d0e6c21c9f30aa.jpg"
            alt="over"
          />
          <h3 className="image-item-title">2 billion+</h3>
          <p className="image-item-description">tasks completed</p>
        </div>

        <div className="image-item">
          <img
            className="image-item-size"
            src="https://todoist.b-cdn.net/assets/images/ba90575091d9eafd60f851f7297cb202.jpg"
            alt="over"
          />
          <h3 className="image-item-title">1 million+</h3>
          <p className="image-item-description">pro users</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
