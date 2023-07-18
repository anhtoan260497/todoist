import React, { useCallback, useMemo } from "react";
import "./styles.scss";
import ProjectItem from "../ProjectItem";
import {
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import AddProjectModal from "../AddProjectModal";
import { Link, useParams } from "react-router-dom";
import appRoute from "../../routes/app";
import { toggleModalAddProject } from "../../features/modal/modalSlice";
import useProjectQuery from "../../hooks/useProjectQuery";
import useTaskQuery from "../../hooks/useTaskQuery";

MenuLeft.propTypes = {};

const { allTask } = appRoute;

function MenuLeft() {
  const params = useParams();
  const dispatch = useDispatch();
  const projectQuery = useProjectQuery('leftMenu');
  const taskQuery = useTaskQuery()
  const renderProject = useCallback(() => {
    if (!projectQuery?.projects) return;
    return projectQuery.projects.map((item) => (
      <Link className="project-item-link" to={`project/${item._id}`} key={item._id}>
        <ProjectItem
          color={item.color}
          key={item._id}
          quantity={item.tasks.length}
          title={item.title}
          id= {item._id}
          
        />
      </Link>
    ));
  }, [projectQuery]);

  const countTask = useMemo(() => {
    let count = 0
    for(let key in taskQuery.tasks) {
      count += taskQuery.tasks[key].length
    }
    return count
  },[taskQuery.tasks])

  const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);

  const isCurrentRoute = (path) => params["*"].includes(path);

  return (
    <div
      className={clsx("menu-left-container", !isActiveMenu && "no-active-menu")}
    >
      <div className="menu-navigate">
        <Link
          to={`project/${allTask}`}
          className={clsx(
            "navigate-item",
            isCurrentRoute(allTask) && "active-link"
          )}
        >
          <div className="navigate-description">
            <CalendarOutlined className="navigate-icon today-icon" />
            <p>All Task</p>
          </div>
          <p className="navigate-item-count">{countTask}</p>
        </Link>
      </div>

      <div className="menu-left-title">
        Projects
        <PlusOutlined
          className="header-icon"
          onClick={() => dispatch(toggleModalAddProject(true))}
        />
      </div>
      <ul className="list-project-container">{renderProject()}</ul>

      <AddProjectModal />
    </div>
  );
}

export default MenuLeft;
