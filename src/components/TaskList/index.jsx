import React, { useEffect, useState } from "react";
import EmptyTaskToday from "../EmptyTaskToday";
import "./styles.scss";
import TaskListItem from "../TaskListItem";
import useTaskQuery from "../../hooks/useTaskQuery";
import { allTask } from "../../helper";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";

TaskList.propTypes = {};

function TaskList() {
  const taskQuery = useTaskQuery();
  const [isOpenOverdue, setIsOpenOverdue] = useState(true);
  const [isOpenToday, setIsOpenToday] = useState(true);
  const [isOpenUpcoming, setIsOpenUpcoming] = useState(true);

  const renderOverdueTaskList = () =>
    taskQuery.tasks.overdue.map((item) => (
      <TaskListItem key={item._id} taskItemData={item} isOverdue />
    ));

  const renderTodayTaskList = () =>
    taskQuery.tasks.today.map((item) => (
      <TaskListItem key={item._id} taskItemData={item} />
    ));

  const renderUpcomingTaskList = () =>
    taskQuery.tasks.upcoming.map((item) => (
      <TaskListItem key={item._id} taskItemData={item} />
    ));

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
