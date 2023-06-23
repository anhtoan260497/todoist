import React, { useState } from "react";
import { DatePicker, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddTask } from "../../features/modal/modalSlice";
import "./styles.scss";

function AddTaskModal({ isShowAddTaskModal, setIsShowAddTaskModal }) {
  const isShowModalAddTask = useSelector(
    (state) => state.modalReducer.isShowModalAddTask
  );
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [datePicker, setDatePicker] = useState(Date.now());
  const [priorityPicker, setPriorityPicker] = useState(0);

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

  const submitTask = () => {
    ///do something here
    ///
    //
    setTaskName("");
    setDescription("");
    setDatePicker(Date.now());
    setPriorityPicker(0);
    dispatch(toggleModalAddTask(false));
  };

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (date) => {
    setDatePicker(date.$d);
  };

  const handleChangePriority = (value) => {
    setPriorityPicker(value);
  };

  return (
    <Modal
      closable={false}
      open={isShowModalAddTask}
      onOk={() => submitTask("hi")}
      onCancel={() => dispatch(toggleModalAddTask(false))}
      okButtonProps={{ disabled: taskName.length === 0 }}
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
        />

        <Select
          style={{
            width: 120,
          }}
          onChange={handleChangePriority}
          options={priorityOptions}
          className="select-picker"
          placeholder="Priority"
        />
      </div>
    </Modal>
  );
}

export default AddTaskModal;
