import React, { useRef, useState, ReactDOM, useCallback } from "react";
import "./styles.scss";
import { DatePicker, Dropdown, Modal, Select, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalTaskDetail } from "../../features/modal/modalSlice";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import taskAPI from "../../api/taskAPI";
import useCalculateTime from "../../hooks/useCalculateTime";
import clsx from "clsx";
import SubTaskItem from "../SubTaskItem";
import dayjs from "dayjs";

TaskDetailModal.propTypes = {};

function TaskDetailModal({ taskItemData }) {
  const taskDetailId = useSelector((state) => state.modalReducer.taskDetailId);
  const queryClient = useQueryClient();
  const { title, description, subTask, labels, date, _id, project, isOverdue,priority } =
    taskItemData;

  const dispatch = useDispatch();

  console.log("project", project, taskItemData);

  const priorityOptions = [
    {
      value: 0,
      label: `🔴 Priority 1`,
    },
    {
      value: 1,
      label: `🟡 Priority 2`,
    },
    {
      value: 2,
      label: `🟢 Priority 3`,
    },
  ];

  const time = useCalculateTime(date);
  console.log(time)

  const [descriptionValue, setDescriptionValue] = useState(description);
  const [titleValue, setTitleValue] = useState(title);
  const [isShowSubTask, setIsShowSubTask] = useState(true);
  const [datePicker, setDatePicker] = useState();
  const [priorityPicker, setPriorityPicker] = useState(priorityOptions?.[priority] || null);

  const isShowModalTaskDetail = useSelector(
    (state) => state.modalReducer.isShowModalTaskDetail
  );

  const textAearRef = useRef();

  const renderSubTask = () => {
    return subTask.map((item,idx) => <SubTaskItem key={idx} taskItemData={item} />);
  };

  const handleOk = () => {
    dispatch(toggleModalTaskDetail(false));
  };
  const handleCancel = () => {
    dispatch(toggleModalTaskDetail(false));
    setDescriptionValue(description);
    setTitleValue(title);
  };

  const handleDoneTask = async () => {
    const chooseTask = {
      projectName: project,
      _id,
    };
    const res = await taskAPI.removeTask(chooseTask);
    return res;
  };

  const handleChangeValue = useCallback((e) => {
    setDescriptionValue(e.target.value);
  }, []);

  const handleChangeTitleValue = useCallback((e) => {
    setTitleValue(e.target.value);
  }, []);

  const textAreaAdjust = useCallback(() => {
    if (!textAearRef.current) return;
    textAearRef.current.style.height = "1px";
    textAearRef.current.style.height =
      10 + textAearRef.current.scrollHeight + "px";
  }, []);

  const handleChangeDate = (date) => {
    setDatePicker(date.$d);
  };

  const handleChangePriority = (value) => {
    setPriorityPicker(value);
  };

  const items = [
    {
      label: (
        <div className="project-name" onClick={(e) => e.preventDefault()}>
          <div className="project-name-name ">
            <div className="color-dot"></div>
            <span className="cut-text">
              ProjectNamebioadbsodboaisbdioasbdioasbdoiasb
            </span>
          </div>
          <DownOutlined />
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="project-name " onClick={(e) => e.preventDefault()}>
          <div className="project-name-name ">
            <div className="color-dot"></div>
            <span className="cut-text">
              ProjectNamebioadbsodboaisbdioasbdioasbdoiasb
            </span>
          </div>
          <DownOutlined />
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="project-name" onClick={(e) => e.preventDefault()}>
          <div className="project-name-name ">
            <div className="color-dot"></div>
            <span className="cut-text">
              ProjectNamebioadbsodboaisbdioasbdioasbdoiasb
            </span>
          </div>
          <DownOutlined />
        </div>
      ),
      key: "3",
    },
  ];

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
    <Modal
      title={project}
      className="modal-task-detail-modal"
      maskStyle={{ backgroundColor: "rgba(0,0,0,50%)" }}
      open={isShowModalTaskDetail}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      closable
    >
      <div className="task-detail-left-modal">
        <div className="task-list-item-container">
          <Tooltip title="check done">
            <button
              className="check-button"
              onClick={() => tasksMutation.mutate()}
            >
              <CheckOutlined className="check-icon" />
            </button>
          </Tooltip>
          <div className="task-list-item-content">
            <input
              className="task-list-item-title"
              onChange={(e) => handleChangeTitleValue(e)}
              value={titleValue}
            />
            <textarea
              className="task-list-item-description"
              placeholder="Description"
              ref={textAearRef}
              value={descriptionValue}
              onKeyUp={textAreaAdjust}
              onChange={(e) => handleChangeValue(e)}
            />
          </div>
        </div>

        <div className="sub-task-item-container">
          <div
            className="sub-task-item-header"
            onClick={() => setIsShowSubTask(!isShowSubTask)}
          >
            <p className="sub-task-item-title">
              {isShowSubTask ? <CaretDownOutlined /> : <CaretRightOutlined />}
              Sub-Task
            </p>

            <p className="sub-task-item-count">0/3</p>
          </div>
          <div className="clear"></div>
          <div
            className={clsx("option-hidden", isShowSubTask && "option-show")}
          >
            {renderSubTask()}
          </div>
        </div>
      </div>

      <div className="task-detail-right-modal">
        <div className="project-container">
          <p className="project-title"> Project</p>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <div className="project-name" onClick={(e) => e.preventDefault()}>
              <div className="project-name-name ">
                <div className="color-dot"></div>
                <span className="cut-text">
                  ProjectNamebioadbsodboaisbdioasbdioasbdoiasb
                </span>
              </div>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
        <div className="clear"></div>

        <div className="project-container">
          <p className="project-title"> Due Date</p>
          <div className="project-date">
            <DatePicker
              className="date-picker"
              onChange={handleChangeDate}
              placeholder="Due Date"
              defaultValue={dayjs(`${time.date}-${time.monthNum}-${time.year}`, 'DD-MM-YYYY')}
            />
          </div>
        </div>

        <div className="clear"></div>

        <div className="project-container">
          <p className="project-title"> Priority</p>
          <div className="project-date">
            <Select
              style={{
                width: 120,
              }}
              defaultValue={priorityPicker}
              onChange={handleChangePriority}
              options={priorityOptions}
              className="select-picker"
              placeholder="Priority"
            />
          </div>
        </div>
      </div>

      <div className="task-deta"></div>
    </Modal>
  );
}

export default TaskDetailModal;
