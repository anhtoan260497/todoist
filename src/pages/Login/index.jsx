import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Typography } from "antd";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginRoute from "../../routes/login";

const { Title } = Typography;
const {signup,login} = loginRoute
console.log(loginRoute)


Login.propTypes = {
    isLogin : PropTypes.bool.isRequired
};

function Login({isLogin}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="login-container">

      <div className="left-form">
        <img src={process.env.PUBLIC_URL + "/svg/icon.svg"} alt="" />

        <div className="login-area">
          <Title level={2}>{!isLogin ? 'Sign up' : 'Login'}</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className="input-area">
              <label>Email</label>
              <input
                className="input-field"
                {...register("email", { required: true })}
                placeholder="Enter your email..."
              />
              {errors.email && <p className="form-error">Email is required</p>}
            </div>

            <div className="input-area">
              <label>Password</label>
              <input
                className="input-field"
                {...register("password", { required: true })}
                placeholder="Enter your password..."
              />
              {/* errors will return when field validation fails  */}
              {errors.password && (
                <p className="form-error">Password is required</p>
              )}
            </div>

            <input
              className="input-submit"
              type="submit"
              value={!isLogin ? 'Sign up with Email' : 'Login'}
            />
          </form>
        </div>

        <div class="term">
          By continuing with Email, you agree to Todoist’s{" "}
          <br/>
          <a href="https://todoist.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
          and
          <a
            href="https://todoist.com/privacy"
            target="_blank"
            rel="noreferrer">
            Privacy Policy
          </a>
          .
        </div>

        <div className="clear"></div>

        <p className="login-more">
          {!isLogin ? <>`Already signed up? <Link to={`/${login}`}>Sign up</Link> </>: <>`Don’t have an account? <Link to={`/${signup}`}>Go to login</Link></> } 
        </p>
      </div>

      <div className="right-form">
        <div className="image-item">
            <img className="image-item-size" src="https://todoist.b-cdn.net/assets/images/ae01c415678c90d0c606bc6917758502.jpg" alt='over' />
            <h3 className="image-item-title">30 milion+</h3>
            <p className="image-item-description">app downloads</p>
        </div>

        <div className="image-item">
            <img className="image-item-size" src="https://todoist.b-cdn.net/assets/images/573fa908fbccdf1600f90f16a0c2e311.jpg" alt='over' />
            <h3 className="image-item-title">15 years+</h3>
            <p className="image-item-description">in business</p>
        </div>

        <div className="image-item">
            <img className="image-item-size" src="https://todoist.b-cdn.net/assets/images/87ded242639ba32ef4d0e6c21c9f30aa.jpg" alt='over' />
            <h3 className="image-item-title">2 billion+</h3>
            <p className="image-item-description">tasks completed</p>
        </div>

        <div className="image-item">
            <img className="image-item-size" src="https://todoist.b-cdn.net/assets/images/ba90575091d9eafd60f851f7297cb202.jpg" alt='over' />
            <h3 className="image-item-title">1 million+</h3>
            <p className="image-item-description">pro users</p>
        </div>
            
      </div>
    </div>
  );
}

export default Login;
