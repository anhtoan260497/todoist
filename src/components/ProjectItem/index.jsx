import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { setIsShowDeleteProjectModal } from "../../features/modal/modalSlice";
import { Modal, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import projectAPI from "../../api/projectAPI";
import { useMutation, useQueryClient } from "react-query";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";

ProjectItem.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

function ProjectItem({ color, title, quantity, id }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isShowDeleteProjectModal = useSelector(
    (state) => state.modalReducer.isShowDeleteProjectModal
  );
  const queryClient = useQueryClient();

  const submitDeleteProject = async () => {
    const res = await projectAPI.removeProject({ title });
    dispatch(setIsShowDeleteProjectModal(false));
    return res;
  };

  const deleteProjectMutation = useMutation({
    mutationFn: submitDeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Delete Project"));
      navigate("project/all");
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
    onError: () => {
      dispatch(setToastType("error"));
      dispatch(setToastMessage("Failed"));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
  });

  return (
    <div
      className={clsx(
        "project-item-container",
        params.id === id && "active-item"
      )}
    >
      <div style={{ backgroundColor: color }} className="color-dot"></div>
      <p className="project-title">{title}</p>
      <div>
        <p className="quantity">{quantity}</p>

        <div className="edit-icons-container">
          <Tooltip title="Delete Project">
            <CloseCircleOutlined
              className="icon"
              onClick={() => dispatch(setIsShowDeleteProjectModal(true))}
            />
          </Tooltip>
        </div>
      </div>
      <Modal
        title={`Delete project ${title}`}
        open={isShowDeleteProjectModal}
        okText="Confirm"
        cancelText="Deny"
        onOk={() => deleteProjectMutation.mutate()}
        onCancel={() => dispatch(setIsShowDeleteProjectModal(false))}
      >
        Delete project {title} ?
      </Modal>
    </div>
  );
}

export default ProjectItem;
