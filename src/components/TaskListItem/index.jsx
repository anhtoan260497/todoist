import React, { useEffect } from "react";
import "./styles.scss";
import {
  CalendarOutlined,
  CheckOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import useCalculateTime from "../../hooks/useCalculateTime";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import taskAPI from "../../api/taskAPI";
import { Tooltip } from "antd";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import clsx from "clsx";
import TaskDetailModal from "../TaskDetailModal";
import {
  setTaskDetailId,
  toggleModalTaskDetail,
} from "../../features/modal/modalSlice";

TaskListItem.propTypes = {
  taskItemData: PropTypes.object.isRequired,
  isOverdue: PropTypes.bool,
};

TaskListItem.defaultProps = {
  isOverdue: false,
};

function TaskListItem({ taskItemData, isOverdue }) {
  const { title, description, subTask, date, _id, project } =
    taskItemData;
  const time = useCalculateTime(date);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const taskDetailId = useSelector((state) => state.modalReducer.taskDetailId);

  const handleDoneTask = async () => {
    const chooseTask = {
      projectName: project,
      _id,
    };
    const res = await taskAPI.removeTask(chooseTask);
    return res;
  };

  const handleShowTaskDetail = () => {
    dispatch(setTaskDetailId(_id));
    dispatch(toggleModalTaskDetail(true));
  };

  const tasksMutation = useMutation({
    mutationFn: handleDoneTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Done"));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 2000);
    },
  });

  return (
    <>
      <div className="task-list-item-container">
        <Tooltip title="check done">
          <button
            className="check-button"
            onClick={() => tasksMutation.mutate()}
          >
            <CheckOutlined className="check-icon" />
          </button>
        </Tooltip>
        <div
          className="task-list-item-content"
          onClick={() => handleShowTaskDetail()}
        >
          <h3 className="task-list-item-title">{title}</h3>
          <p className="task-list-item-description">{description}</p>
          <div className="task-list-item-extra-info">
            {subTask.length > 0 && (
              <div className="extra-item">
                <NodeIndexOutlined />
                <p>{subTask.length}</p>
              </div>
            )}
            {time && (
              <div className={clsx("extra-item", isOverdue && "overdue-color")}>
                <CalendarOutlined />
                <p>{`${time.date} ${time.shortMonths}`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="clear" />
      {taskDetailId === _id && <TaskDetailModal taskItemData={taskItemData} />}
      <Toast />
    </>
  );
}

export default TaskListItem;
