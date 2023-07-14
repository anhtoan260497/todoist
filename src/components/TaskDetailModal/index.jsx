import React, { useRef, useState, ReactDOM, useCallback, useMemo } from "react";
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
import useTaskQuery from "../../hooks/useTaskQuery";
import useProjectQuery from "../../hooks/useProjectQuery";
import projectAPI from "../../api/projectAPI";

TaskDetailModal.propTypes = {};

function TaskDetailModal({ taskItemData }) {
  const queryClient = useQueryClient();
  const {
    title,
    description,
    subTask,
    labels,
    date,
    _id,
    project,
    isOverdue,
    priority,
  } = taskItemData;

  const dispatch = useDispatch();
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
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [titleValue, setTitleValue] = useState(title);
  const [isShowSubTask, setIsShowSubTask] = useState(true);
  const [datePicker, setDatePicker] = useState();
  const [priorityPicker, setPriorityPicker] = useState(
    priorityOptions?.[priority] || null
  );
  const [selectedProject, setSelectedProject] = useState(project);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const isShowModalTaskDetail = useSelector(
    (state) => state.modalReducer.isShowModalTaskDetail
  );

  const textAearRef = useRef();

  const projectQuery = useProjectQuery();

  const listProject = useMemo(() => {
    if (projectQuery.isLoading || projectQuery?.projects?.length === 0) return;
    return projectQuery.projects.map((item) => ({
      title: item.title,
      _id: item._id,
    }));
  }, [projectQuery]);

  const renderSubTask = () => {
    return subTask.map((item, idx) => (
      <SubTaskItem key={idx} taskItemData={item} />
    ));
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

  const onUpdateProject = useCallback(
    async ({ projectChange }) => {
      const cloneTaskItemData = { ...taskItemData };
      cloneTaskItemData.title = titleValue;
      cloneTaskItemData.description = descriptionValue;
      cloneTaskItemData.project = projectChange || project;
      cloneTaskItemData.projectChange =
        projectChange !== project ? true : false;
      cloneTaskItemData.oldProject = projectChange !== project ? project : null;
      cloneTaskItemData.priority = priorityPicker;
      cloneTaskItemData.date = datePicker || date;
      console.log(cloneTaskItemData);
      const res = await projectAPI.updateProject(cloneTaskItemData);
      return res;
    },
    [
      taskItemData,
      titleValue,
      descriptionValue,
      priorityPicker,
      datePicker,
      project,
      date,
    ]
  );

  const projectMutation = useMutation({
    mutationFn: ({ projectChange   }) => onUpdateProject({ projectChange }),
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    },
    onError: () => {
      console.log("hi");
    },
  });

  const handleChangeValue = useCallback(
    (e) => {
      setDescriptionValue(e.target.value);
      if (descriptionRef.current) clearTimeout(descriptionRef.current);
      descriptionRef.current = setTimeout(() => {
        projectMutation.mutate({ projectChange: project });
      }, 1000);
    },
    [projectMutation,project]
  );

  const handleChangeTitleValue = useCallback(
    (e) => {
      setTitleValue(e.target.value);
      if (titleRef.current) clearTimeout(titleRef.current);
      titleRef.current = setTimeout(() => {
        projectMutation.mutate({ projectChange: project });
      }, 1000);
    },
    [projectMutation,project]
  );

  const handleChangeProject = useCallback(
    (title) => {
      setSelectedProject(title);
      if (title === selectedProject) return;
      projectMutation.mutate({ projectChange: title });
    },
    [projectMutation, selectedProject]
  );

  const textAreaAdjust = useCallback(() => {
    if (!textAearRef.current) return;
    textAearRef.current.style.height = "1px";
    textAearRef.current.style.height =
      10 + textAearRef.current.scrollHeight + "px";
  }, []);

  const handleChangeDate = useCallback(
    (date) => {
      setDatePicker(new Date(date.$d).getTime());
      projectMutation.mutate({ projectChange: project });
    },
    [projectMutation,project]
  );

  const handleChangePriority = useCallback(
    (value) => {
      setPriorityPicker(value);
      projectMutation.mutate({ projectChange: project });
    },
    [projectMutation,project]
  );

  const projectItems = useMemo(() => {
    if (!listProject || listProject?.length === 0)
      // return [{ label: <></>, key: 0 }];
      return;
    return listProject.map((item) => {
      return {
        label: (
          <div
            className="project-name"
            onClick={() => handleChangeProject(item.title)}
          >
            <div className="project-name-name ">
              <div className="color-dot"></div>
              <span className="cut-text">{item.title}</span>
            </div>
            <DownOutlined />
          </div>
        ),
        key: item._id,
      };
    });
  }, [listProject, handleChangeProject]);

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
              items: projectItems,
            }}
            trigger={["click"]}
          >
            <div className="project-name">
              <div className="project-name-name">
                <div className="color-dot"></div>
                <span className="cut-text">{selectedProject}</span>
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
              defaultValue={dayjs(
                `${time.date}-${time.monthNum}-${time.year}`,
                "DD-MM-YYYY"
              )}
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
