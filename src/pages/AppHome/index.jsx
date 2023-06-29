import React from "react";
import PropTypes from "prop-types";
import Layout from "../../Layout";
import "./styles.scss";
import MenuLeft from "../../components/MenuLeft";
import AppRight from "../../components/AppRight";

AppHome.propTypes = {};

function AppHome() {
  return (
    <Layout>
      <div className="app-home-ui">
        <MenuLeft />
        
        <AppRight />
      </div>
    </Layout>
  );
}

export default AppHome;
