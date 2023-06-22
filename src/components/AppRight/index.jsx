import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { useSelector } from "react-redux";
import clsx from "clsx";
import EmptyTaskToday from "../EmptyTaskToday";
import TaskAreaHeader from "../TaskAreaHeader";
import { Outlet, Route, Routes } from "react-router-dom";

AppRight.propTypes = {};

function AppRight() {
  
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);

  return (
    <div
      className={clsx(
        "app-right-container",
        isActiveMenu && "minimize-app-right"
      )}
    >
      <TaskAreaHeader />

      <Outlet />
     
    </div>
  );
}

export default AppRight;
