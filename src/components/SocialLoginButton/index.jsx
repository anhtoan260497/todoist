import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { capitalizeFirstLetter } from "../../helper";

SocialLoginButton.propTypes = {
  type: PropTypes.string.isRequired,
};

function SocialLoginButton({type}) {
  const socialType = {
    facebook: {
      img: "/facebook-icon.webp",
    },
    apple: {
      img: "/apple-icon.png",
    },
    google: {
      img: "/google-icon.png",
    },
  };

  return (
    <button className="social-link-button">
      <img
        className="social-logo"
        src={process.env.PUBLIC_URL + socialType[type].img}
        alt="logo"
      />
      <p className="social-title">Continue with {capitalizeFirstLetter(type)}</p>
    </button>
  );
}

export default SocialLoginButton;
