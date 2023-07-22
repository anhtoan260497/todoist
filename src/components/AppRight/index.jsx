import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import TaskAreaHeader from "../TaskAreaHeader";
import { Outlet } from "react-router-dom";
import useTaskQuery from "../../hooks/useTaskQuery";
import Loading from "../Loading";
import { setActiveMenu } from "../../features/menu/menuSlice";

function AppRight() {
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);
  const dispatch = useDispatch();
  const taskQuery = useTaskQuery();

  return (
    <>
      {!taskQuery.isLoading ? (
        <div
          className={clsx(
            "app-right-container",
            isActiveMenu && "minimize-app-right"
          )}
          onClick={() => dispatch(setActiveMenu(false))}
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
