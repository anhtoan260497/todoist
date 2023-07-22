import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import taskAPI from "../../api/taskAPI";
import { useDispatch } from "react-redux";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import { Tooltip } from "antd";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./styles.scss";
import clsx from "clsx";

SubTaskItem.propTypes = {};

function SubTaskItem({ taskItemData, _id, subTask, project, subTaskId }) {

  const { title, description, isDone } = taskItemData;
  
  const [onFocusSubTask, setOnFocusTask] = useState(false);
  const [onHoverItem, setOnHoverItem] = useState(false);

  const queryClient = useQueryClient();
  const textAearRef = useRef();
  const dispatch = useDispatch();

  const [descriptionValue, setDescriptionValue] = useState(description);
  const [titleValue, setTitleValue] = useState(title);

  const textAreaAdjust = useCallback(() => {
    if (!textAearRef.current) return;
    textAearRef.current.style.height = "1px";
    textAearRef.current.style.height =
      10 + textAearRef.current.scrollHeight + "px";
  }, []);

  const handleChangeValue = useCallback((e) => {
    setDescriptionValue(e.target.value);
  }, []); 

  const handleChangeTitleValue = useCallback((e) => {
    setTitleValue(e.target.value);
  }, []);

  const onDoneSubTask = useCallback(
    async (type) => {
      const cloneSubTask = [...subTask];
      const subTaskIdx = cloneSubTask.findIndex(
        (item) => item._id === subTaskId
      );
      if (type === "check") {
        cloneSubTask[subTaskIdx].isDone = !isDone;
      }

      if (type === "remove") {
        cloneSubTask.splice(subTaskIdx, 1);
      }

      const res = await taskAPI.checkSubTask({
        _id: _id,
        project,
        newSubTask: cloneSubTask,
      });
      return res;
    },
    [_id, isDone, project, subTask, subTaskId]
  );

  const onDoneSubTaskMutation = useMutation({
    mutationFn: (type) => onDoneSubTask(type),
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Update Sub-Task"));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
    onError: () => {
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Error, please try again"));

      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
  });

  return (
    <>
      <div
        className="task-list-item-container sub-tab-list-item-container"
        onFocus={() => setOnFocusTask(true)}
        onMouseEnter={() => setOnHoverItem(true)}
        onMouseLeave={() => setOnHoverItem(false)}
      >
        <Tooltip title={!isDone ? 'Check done' : "Remove check done"}>
          <button
            className="check-button"
            onClick={() => onDoneSubTaskMutation.mutate("check")}
          >
            <CheckOutlined
              className={clsx("check-icon", isDone && "check-done")}
            />
          </button>
        </Tooltip>

        <div className="task-list-item-content">
          <div className="task-list-item-header">
            <input
              className={clsx(
                "task-list-item-title",
                isDone && "task-list-item-done"
              )}
              disabled={isDone}
              onChange={(e) => handleChangeTitleValue(e)}
              value={titleValue}
            />
            {onHoverItem && (
              <Tooltip
                title="Delete task"
                onClick={() => onDoneSubTaskMutation.mutate("remove")}
              >
                <CloseCircleOutlined className="icon" />
              </Tooltip>
            )}
          </div>

          {descriptionValue || onFocusSubTask ? (
            <textarea
              className={clsx(
                "task-list-item-description",
                isDone && "task-list-item-done"
              )}
              disabled={isDone}
              onBlur={() => setOnFocusTask(false)}
              placeholder="Description"
              ref={textAearRef}
              value={descriptionValue}
              onKeyUp={textAreaAdjust}
              onChange={(e) => handleChangeValue(e)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="clear"></div>
    </>
  );
}

export default SubTaskItem;
