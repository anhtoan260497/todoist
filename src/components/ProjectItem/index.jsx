import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

ProjectItem.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

function ProjectItem({ color, title, quantity, id }) {
  const params = useParams();

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
          <EditOutlined />
          <CloseCircleOutlined />
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
