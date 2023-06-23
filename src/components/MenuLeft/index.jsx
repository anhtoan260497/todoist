import React, { useState } from "react";
import "./styles.scss";
import ProjectItem from "../ProjectItem";
import {
  CalendarOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";

MenuLeft.propTypes = {};

function MenuLeft() {
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);

  return (
    <div
      className={clsx("menu-left-container", !isActiveMenu && "no-active-menu")}
    >
      <div className="menu-navigate">
        <div className="navigate-item">
          <div className="navigate-description">
            <CalendarOutlined className="navigate-icon today-icon" />
            <p>Today</p>
          </div>
          <p className="navigate-item-count">2</p>
        </div>
        <div className="navigate-item">
          <div className="navigate-description">
            <UnorderedListOutlined className="navigate-icon upcoming-icon" />
            <p>Upcoming</p>
          </div>
          <p className="navigate-item-count">2</p>
        </div>
      </div>
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
