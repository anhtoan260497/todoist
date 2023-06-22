import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

ProjectItem.propTypes = {
    color : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    quantity : PropTypes.number.isRequired
};

function ProjectItem({color,title,quantity}) {
  return (
    <div className="project-item-container">
      <div style={{ backgroundColor: color }} className="color-dot"></div>
      <p className="project-title">{title}</p>
      <p className="quantity">{quantity}</p>
    </div>
  );
}

export default ProjectItem;
