import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddTaskModal from "../AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddProject, toggleModalAddTask } from "../../features/modal/modalSlice";
import useCalculateToday from "../../hooks/useCalculateTime";
import useProjectQuery from "../../hooks/useProjectQuery";

TaskAreaHeader.propTypes = {};

function TaskAreaHeader() {
  const dispatch = useDispatch();
  const dateObj = useCalculateToday();
  const projectQuery = useProjectQuery("menuLeft");

  return (
    <div className="task-area-header">
      <div className="header-today">
        <div className="date-today">
          <h3 className="title">Today</h3>
          <p className="description">{`${dateObj.shortWeekdays} ${dateObj.date} ${dateObj.shortMonths}`}</p>
        </div>
        {!projectQuery?.isLoading && projectQuery?.projects.length > 0 ? (
          <div
            className="new-task"
            onClick={() => dispatch(toggleModalAddTask(true))}
          >
            <PlusOutlined className="new-task-icon" />
            <p className="description add-label">Add Task</p>
          </div>
        ) : (
          <div
            className="new-task"
            onClick={() => dispatch(toggleModalAddProject(true))}
          >
            <PlusOutlined className="new-task-icon" />
            <p className="description add-label">Create a Project</p>
          </div>
        )}
      </div>
      <AddTaskModal />
    </div>
  );
}

export default TaskAreaHeader;
