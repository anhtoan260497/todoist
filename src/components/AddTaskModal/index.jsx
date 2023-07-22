import React, { useEffect, useMemo, useState } from "react";
import { DatePicker, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddTask } from "../../features/modal/modalSlice";
import "./styles.scss";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";
import useCalculateTime from "../../hooks/useCalculateTime";
import dayjs from "dayjs";
import useProjectQuery from "../../hooks/useProjectQuery";
import { useParams } from "react-router-dom";
import taskAPI from "../../api/taskAPI";
import { useMutation, useQueryClient } from "react-query";

function AddTaskModal() {
  const isShowModalAddTask = useSelector(
    (state) => state.modalReducer.isShowModalAddTask
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [datePicker, setDatePicker] = useState(Date.now());
  const [priorityPicker, setPriorityPicker] = useState(2);
  const currentTime = useMemo(useCalculateTime, []);
  const [selectedProject, setSelectedProject] = useState();
  const projectQuery = useProjectQuery("leftMenu");
  const params = useParams();
  const priorityOptions = [
    {
      value: 1,
      label: `🔴 Priority 1`,
    },
    {
      value: 2,
      label: `🟡 Priority 2`,
    },
    {
      value: 3,
      label: `🟢 Priority 3`,
    },
  ];


  const projectList = useMemo(() => {
    if (projectQuery.isLoading) return [];
    const projectListOptions = [];
    // eslint-disable-next-line array-callback-return
    projectQuery.projects.map((item) => {
      projectListOptions.push({
        value: item._id,
        label: item.title,
      });
    });
    return projectListOptions;
  }, [projectQuery.isLoading, projectQuery.projects]);
  
  const submitTask = async () => {
    const projectIdx = projectQuery.projects.findIndex(
      (item) => item._id === params.id
    );
    const newTask = {
      title: taskName,
      description: description,
      subTask: [],
      project:
      selectedProject?.label || projectQuery?.projects?.[projectIdx]?.title,
      date: datePicker,
      priority: priorityPicker,
    };
    const project =
    selectedProject?.label || projectQuery?.projects?.[projectIdx]?.title
    const projectId = selectedProject?.value ||params?.id;

    const res = await taskAPI.addTask({ newTask, project, projectId });
    setTaskName("");
    setDescription("");
    setDatePicker(Date.now());
    setPriorityPicker(priorityPicker);
    dispatch(toggleModalAddTask(false));
    return res;
  };

  const addTaskMutation = useMutation({
    mutationFn: submitTask,
    onSuccess: () => {
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Add task"));
      queryClient.invalidateQueries({ queryKey: ["task"] });
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
    onError: () => {
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Fail, please try again "));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
  });

  useEffect(() => {
    if (!isShowModalAddTask) {
      setTaskName("");
      setDescription("");
      setDatePicker(Date.now());
      setPriorityPicker(2);
    }
  }, [isShowModalAddTask]); // reset modal  

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (date) => {
    const timestamp = new Date(date).getTime();
    setDatePicker(timestamp);
  };

  const handleChangePriority = (value) => {
    setPriorityPicker(value);
  };


  const handleChangeProject = (value) => {
    const selectedProject = projectList.filter((item) => item.value === value);
    setSelectedProject(selectedProject[0]);
  };

  return (
    <Modal
      closable={false}
      open={isShowModalAddTask}
      onOk={() => addTaskMutation.mutate()}
      onCancel={() => dispatch(toggleModalAddTask(false))}
      okButtonProps={{ disabled: taskName.length === 0 || !selectedProject?.value}}
      okText="Add Task"
    >
      <input
        className="task-name-input"
        type="text"
        max-length={50}
        placeholder="Task name"
        onChange={(e) => handleChangeTaskName(e)}
        value={taskName}
      />

      <input
        className="task-description-input"
        type="text"
        placeholder="description"
        onChange={(e) => handleChangeDescription(e)}
        value={description}
      />

      <div className="more-task-options">
        <DatePicker
          className="date-picker"
          onChange={handleChangeDate}
          placeholder="Due Date"
          defaultValue={dayjs(
            `${currentTime.date}-${currentTime.monthNum}-${currentTime.year}`,
            "DD-MM-YYYY"
          )}
        />

        <Select
          style={{
            width: 120,
          }}
          onChange={handleChangePriority}
          defaultValue={priorityOptions[priorityPicker].label}
          options={priorityOptions}
          className="select-picker"
          placeholder="Priority"
        />

        <Select
          style={{
            width: 120,
          }}
          onChange={handleChangeProject}
          options={projectList}
          className="select-picker"
          placeholder="Project"
        />
      </div>
    </Modal>
  );
}

export default AddTaskModal;
