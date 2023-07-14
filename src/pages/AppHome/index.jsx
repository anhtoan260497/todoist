import React from "react";
import Layout from "../../Layout";
import "./styles.scss";
import MenuLeft from "../../components/MenuLeft";
import AppRight from "../../components/AppRight";

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
