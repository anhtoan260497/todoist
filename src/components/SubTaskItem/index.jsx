import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import taskAPI from "../../api/taskAPI";
import { useDispatch } from "react-redux";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import { toggleModalTaskDetail } from "../../features/modal/modalSlice";
import { Tooltip } from "antd";
import {
  CheckOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import clsx from "clsx";

SubTaskItem.propTypes = {};

function SubTaskItem({ taskItemData }) {
  const {
    title,
    description,
   isDone
  } = taskItemData;

  const [onFocusSubTask, setOnFocusTask] = useState(false);
  const [onHoverItem,setOnHoverItem] = useState(false)

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const textAearRef = useRef();
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

  const handleDoneTask = async () => {
    const chooseTask = {
      // projectName: project,
      // _id,
    };
    const res = await taskAPI.removeTask(chooseTask);
    return res;
  };

  const tasksMutation = useMutation({
    mutationFn: handleDoneTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Done"));
      dispatch(toggleModalTaskDetail(false));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 2000);
    },
  });

  return (
    <><div
      className="task-list-item-container sub-tab-list-item-container"
      onFocus={() => setOnFocusTask(true)}
      onMouseEnter={() => setOnHoverItem(true)}
      onMouseLeave={() => setOnHoverItem(false)}
    >
      <Tooltip title="Check done">
        <button className="check-button" onClick={() => tasksMutation.mutate()}>
          <CheckOutlined className={clsx('check-icon', isDone && 'check-done')} />
        </button>
      </Tooltip>

      <div className="task-list-item-content">
        <div className="task-list-item-header">
          <input
            className={clsx('task-list-item-title', isDone && 'task-list-item-done')}
            onChange={(e) => handleChangeTitleValue(e)}
            value={titleValue}
          />
         {onHoverItem && <Tooltip title="Delete task">
            <CloseCircleOutlined className="icon" />
          </Tooltip>}
        </div>

        {descriptionValue || onFocusSubTask ? (
          <textarea
            className={clsx('task-list-item-description',isDone && 'task-list-item-done')}
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
