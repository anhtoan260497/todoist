import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

AddTaskModal.propTypes = {
    setIsShowAddTaskModal : PropTypes.func,
    isShowAddTaskModal : PropTypes.bool.isRequired
};

function AddTaskModal({isShowAddTaskModal, setIsShowAddTaskModal}) {

    const submitTask = () => {
        console.log('hi')
    }

    return (
        <Modal
        title="Add Task"
        closable={false}
        open={isShowAddTaskModal}
        onOk={() => submitTask("hi")}
        onCancel={() => setIsShowAddTaskModal(false)}
      >
     hello
      </Modal>
    );
}

export default AddTaskModal;