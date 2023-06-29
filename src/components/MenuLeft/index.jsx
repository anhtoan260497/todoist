import React from "react";
import "./styles.scss";
import ProjectItem from "../ProjectItem";
import {
  CalendarOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import AddProjectModal from "../AddProjectModal";
import { Link, useParams } from "react-router-dom";
import appRoute from "../../routes/app";
import { toggleModalAddProject } from "../../features/modal/modalSlice";

MenuLeft.propTypes = {};


const {today, upcoming} = appRoute

function MenuLeft() {
  
  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);
  const params = useParams()
  const dispatch = useDispatch()

  const isCurrentRoute = (path) =>  params['*'].includes(path)
  
  return (
    <div
      className={clsx("menu-left-container", !isActiveMenu && "no-active-menu")}
    >
      <div className="menu-navigate">
        <Link to={today} className={clsx('navigate-item', isCurrentRoute(today) && 'active-link')}>
          <div className="navigate-description">
            <CalendarOutlined className="navigate-icon today-icon" />
            <p>Today</p>
          </div>
          <p className="navigate-item-count">2</p>
        </Link>
        <Link to={upcoming} className={clsx('navigate-item', isCurrentRoute(upcoming) && 'active-link')} >
          <div className="navigate-description">
            <UnorderedListOutlined className="navigate-icon upcoming-icon" />
            <p>Upcoming</p>
          </div>
          <p className="navigate-item-count">2</p>
        </Link>
      </div>

      <div className="menu-left-title">
        Favorites
      </div>
      <ul className="list-project-container">
        <ProjectItem color="blue" quantity={2} title="helelo" />
      </ul>

      <div className="menu-left-title">
        Projects
        <PlusOutlined className="header-icon" onClick={()=>dispatch(toggleModalAddProject(true))}/>
      </div>
      <ul className="list-project-container">
        <ProjectItem color="blue" quantity={2} title="helelo" />
      </ul>

      <AddProjectModal/>
    </div>
  );
}

export default MenuLeft;
