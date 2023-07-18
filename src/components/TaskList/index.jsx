import React, { useEffect, useState } from "react";
import EmptyTaskToday from "../EmptyTaskToday";
import "./styles.scss";
import TaskListItem from "../TaskListItem";
import useTaskQuery from "../../hooks/useTaskQuery";
import { allTask } from "../../helper";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";
import useProjectQuery from "../../hooks/useProjectQuery";

function TaskList() {
  const params = useParams();
  const taskQuery = useTaskQuery();
  const projectQuery = useProjectQuery();
  const [isOpenOverdue, setIsOpenOverdue] = useState(true);
  const [isOpenToday, setIsOpenToday] = useState(true);
  const [isOpenUpcoming, setIsOpenUpcoming] = useState(true);

  const renderOverdueTaskList = () => {
    if (params.id && !projectQuery.isLoading) {
     return projectQuery.projects.overdue.map((item, key) => (
        <TaskListItem key={key} taskItemData={item} />
      ));
    }
    return taskQuery.tasks.overdue.map((item, key) => (
      <TaskListItem key={key} taskItemData={item} />
    ));
  };
  
  const renderTodayTaskList = () => {
    if (params.id && !projectQuery.isLoading) {
     return projectQuery.projects.today.map((item, key) => (
        <TaskListItem key={key} taskItemData={item} />
      ));
    }
    return taskQuery.tasks.today.map((item, key) => (
      <TaskListItem key={key} taskItemData={item} />
    ));
  };

  const renderUpcomingTaskList = () => {
    if (params.id && !projectQuery.isLoading) {
      return projectQuery.projects.upcoming.map((item, key) => (
        <TaskListItem key={key} taskItemData={item} />
      ));
    }
    return taskQuery.tasks.upcoming.map((item, key) => (
      <TaskListItem key={key} taskItemData={item} />
    ));
  };

  return (
    <div className="task-list-container ">
      {!taskQuery.isLoading && allTask(taskQuery.tasks).length > 0 ? (
        <>
          {taskQuery.tasks.overdue.length > 0 && (
            <div className="task-list-contain">
              <div
                className="title"
                onClick={() => setIsOpenOverdue(!isOpenOverdue)}
              >
                Overdue
                {!isOpenOverdue ? <CaretLeftOutlined /> : <CaretDownOutlined />}
              </div>
              <div className="clear"></div>
              {isOpenOverdue &&
                !taskQuery.isLoading &&
                allTask(taskQuery.tasks).length > 0 &&
                renderOverdueTaskList()}
            </div>
          )}

          {taskQuery.tasks.today.length > 0 && (
            <div className="task-list-contain">
              <div
                className="title"
                onClick={() => setIsOpenToday(!isOpenToday)}
              >
                Today
                {!isOpenToday ? <CaretLeftOutlined /> : <CaretDownOutlined />}
              </div>
              <div className="clear"></div>
              {isOpenToday &&
                !taskQuery.isLoading &&
                allTask(taskQuery.tasks).length > 0 &&
                renderTodayTaskList()}
            </div>
          )}

          {taskQuery.tasks.upcoming.length > 0 && (
            <div className="task-list-contain">
              <div
                className="title"
                onClick={() => setIsOpenUpcoming(!isOpenUpcoming)}
              >
                Upcoming
                {!isOpenUpcoming ? (
                  <CaretLeftOutlined />
                ) : (
                  <CaretDownOutlined />
                )}
              </div>
              <div className="clear"></div>
              {isOpenUpcoming &&
                !taskQuery.isLoading &&
                allTask(taskQuery.tasks).length > 0 &&
                renderUpcomingTaskList()}
            </div>
          )}
        </>
      ) : (
        <EmptyTaskToday />
      )}

      {/* if no task and path is  /app/today/ show this component */}
    </div>
  );
}

export default TaskList;
