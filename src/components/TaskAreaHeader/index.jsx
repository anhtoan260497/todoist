import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddTaskModal from "../AddTaskModal";

TaskAreaHeader.propTypes = {};

function TaskAreaHeader() {

  const [isShowAddTaskModal,setIsShowAddTaskModal] = useState(false)

  return (
    <div className="task-area-header">
      <div className="header-today">
        <div className="date-today">
          <h3 className="title">Today</h3>
          <p  className="description">Fri 23 Jun</p>
        </div>
        <div className="new-task" onClick={() => setIsShowAddTaskModal(true)}>
          <PlusOutlined className="new-task-icon" />
          <p className="description add-label">Add Task</p>
        </div>
      </div>
      <AddTaskModal isShowAddTaskModal={isShowAddTaskModal} setIsShowAddTaskModal={setIsShowAddTaskModal} />
    </div>
  );
}

export default TaskAreaHeader;
