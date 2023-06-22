import React, { useState } from "react";
import "./styles.scss";
import ProjectItem from "../ProjectItem";
import { PlusOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";

MenuLeft.propTypes = {};

function MenuLeft() {
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);

  return (
    <div
      className={clsx(
        "menu-left-container",
        !isActiveMenu && "no-active-menu"
      )}>
      <div className="menu-left-title">
        Projects
        <PlusOutlined className="header-icon" />
      </div>
      <ul className="list-project-container">
        <ProjectItem color="blue" quantity={2} title="helelo" />
      </ul>
    </div>
  );
}

export default MenuLeft;
