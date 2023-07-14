import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import clsx from "clsx";
import TaskAreaHeader from "../TaskAreaHeader";
import { Outlet } from "react-router-dom";
import useTaskQuery from "../../hooks/useTaskQuery";
import Loading from "../Loading";

function AppRight() {
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);
  const taskQuery = useTaskQuery();

  return (
    <>
      {!taskQuery.isLoading ? (
        <div
          className={clsx(
            "app-right-container",
            isActiveMenu && "minimize-app-right"
          )}
        >
          <TaskAreaHeader />
          <Outlet />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default AppRight;
