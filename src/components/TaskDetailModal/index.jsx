import React, { useRef, useState, ReactDOM, useCallback, useMemo, useEffect } from "react";
import "./styles.scss";
import { DatePicker, Dropdown, Modal, Select, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalTaskDetail } from "../../features/modal/modalSlice";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import taskAPI from "../../api/taskAPI";
import useCalculateTime from "../../hooks/useCalculateTime";
import clsx from "clsx";
import SubTaskItem from "../SubTaskItem";
import dayjs from "dayjs";
import useProjectQuery from "../../hooks/useProjectQuery";
import projectAPI from "../../api/projectAPI";
import { useNavigate, useParams } from "react-router-dom";

TaskDetailModal.propTypes = {};

function TaskDetailModal({ taskItemData }) {
  const queryClient = useQueryClient();
  const {
    title,
    description,
    subTask,
    date,
    _id,
    project,
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
  const params = useParams()
  const navigate = useNavigate()

  const time = useCalculateTime(date);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [titleValue, setTitleValue] = useState(title);
  const [isShowSubTask, setIsShowSubTask] = useState(true);
  const [datePicker, setDatePicker] = useState(date);
  const [priorityPicker, setPriorityPicker] = useState(
    priorityOptions?.[priority] || null
  );
  const [selectedProject, setSelectedProject] = useState(project);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [subTaskDescription, setSubTaskDescription] = useState("");
  const [isShowAddSubTask, setIsShowAddSubTask] = useState(false);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const isShowModalTaskDetail = useSelector(
    (state) => state.modalReducer.isShowModalTaskDetail
  );

  const textAearRef = useRef();

  const projectQuery = useProjectQuery('leftMenu');

  const listProject = useMemo(() => {
    if (projectQuery.isLoading || projectQuery?.projects?.length === 0) return;
    return projectQuery.projects.map((item) => ({
      title: item.title,
      _id: item._id,
      color : item.color
    }));
  }, [projectQuery]);

  const renderSubTask = () => {
    return subTask.map((item, idx) => (
      <SubTaskItem key={item._id} taskItemData={item} _id={_id} subTaskId={item._id} subTask={subTask} project={project} />
    ));
  };

  const handleCancel = () => {
    const url = !params?.id ? `/app/project/all` : `/app/project/${params.id}`
    navigate(url)
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
    async ({ projectChange, date }) => {
      const cloneTaskItemData = { ...taskItemData };
      cloneTaskItemData.title = titleValue;
      cloneTaskItemData.description = descriptionValue;
      cloneTaskItemData.project = projectChange || project;
      cloneTaskItemData.projectChange =
        projectChange !== project ? true : false;
      cloneTaskItemData.oldProject = projectChange !== project ? project : null;
      cloneTaskItemData.date = date || datePicker;
      const res = await projectAPI.updateProject(cloneTaskItemData);
      return res;
    },
    [taskItemData, titleValue, descriptionValue, datePicker, project]
  );

  const onAddSubTask = useCallback(async () => {
    const cloneSubTask = [...subTask];
    if (!subTaskTitle) {
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Sub-Task must have Title"));

      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
      return;
    }
    cloneSubTask.push({
      title: subTaskTitle,
      description: subTaskDescription,
      isDone: false,
    });
    const res = await taskAPI.addSubTask({
      _id,
      project,
      newSubTask: cloneSubTask,
    });
    return res;
  }, [subTask, subTaskTitle, subTaskDescription, _id, project, dispatch]);

  const projectMutation = useMutation({
    mutationFn: ({ projectChange, date }) =>
      onUpdateProject({ projectChange, date }),
    onSuccess: () => {
      queryClient.invalidateQueries(["task","project"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Update Success"));
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

  const addSubTaskMutation = useMutation({
    mutationFn: onAddSubTask,
    onSuccess: () => {
      setSubTaskDescription("");
      setSubTaskTitle("");
      setIsShowAddSubTask(false);
      queryClient.invalidateQueries(["task"]);
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

  const handleChangeValue = useCallback(
    (e) => {
      setDescriptionValue(e.target.value);
      if (descriptionRef.current) clearTimeout(descriptionRef.current);
      descriptionRef.current = setTimeout(() => {
        projectMutation.mutate({ projectChange: project, date });
      }, 1000);
    },
    [projectMutation, project, date]
  );

  const handleChangeTitleValue = useCallback(
    (e) => {
      setTitleValue(e.target.value);
      if (titleRef.current) clearTimeout(titleRef.current);
      titleRef.current = setTimeout(() => {
        projectMutation.mutate({ projectChange: project, date });
      }, 1000);
    },
    [projectMutation, project, date]
  );

  const handleChangeProject = useCallback(
    (title) => {
      setSelectedProject(title);
      if (title === selectedProject) return;
      projectMutation.mutate({ projectChange: title, date });
    },
    [projectMutation, selectedProject, date]
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
      projectMutation.mutate({
        projectChange: project,
        date: new Date(date.$d).getTime(),
      });
    },
    [projectMutation, project]
  );

  const handleChangePriority = useCallback(
    (value) => {
      setPriorityPicker(value);
      projectMutation.mutate({ projectChange: project, date });
    },
    [projectMutation, project, date]
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
              <div style={{ backgroundColor: item.color }} className="color-dot"></div>
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
      title={project}z
      className="modal-task-detail-modal"
      maskStyle={{ backgroundColor: "rgba(0,0,0,50%)" }}
      open={isShowModalTaskDetail}
      onCancel={handleCancel}
      footer={null}
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

            {subTask.length > 0 && (
              <p className="sub-task-item-count">{`${
                subTask.filter((item) => item.isDone).length
              }/${subTask.length}`}</p>
            )}
          </div>
          <div className="clear"></div>
          <div
            className={clsx("option-hidden", isShowSubTask && "option-show")}
          >
            {renderSubTask()}

            {!isShowAddSubTask ? (
              <div
                className="new-subtask"
                onClick={() => setIsShowAddSubTask(true)}
              >
                <PlusOutlined className="new-subtask-icon" />
                <p className="description add-label">Add Task</p>
              </div>
            ) : (
              <>
                <div className="new-subtask-form">
                  <input
                    className="task-list-item-title"
                    onChange={(e) => setSubTaskTitle(e.target.value)}
                    value={subTaskTitle}
                    placeholder="Title"
                  />
                  <textarea
                    className="task-list-item-description"
                    placeholder="Description"
                    ref={textAearRef}
                    value={subTaskDescription}
                    onKeyUp={textAreaAdjust}
                    onChange={(e) => setSubTaskDescription(e.target.value)}
                  />
                </div>
                <div className="new-subtask-button">
                  <button onClick={() => setIsShowAddSubTask(false)}>
                    Cancel
                  </button>
                  <button onClick={() => addSubTaskMutation.mutate()}>
                    Add Sub Task
                  </button>
                </div>
              </>
            )}
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
                `${time.date}-${time.monthNum + 1}-${time.year}`,
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
    </Modal>
  );
}

export default TaskDetailModal;
