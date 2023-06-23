import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import {
  CheckOutlined,
  CommentOutlined,
  NodeIndexOutlined,
  TagOutlined,
} from "@ant-design/icons";


TaskListItem.propTypes = {};

function TaskListItem(props) {
  return (
    <>
      <div className="task-list-item-container">
        <button className="check-button">
          <CheckOutlined className="check-icon" />
        </button>
        <div className="task-list-item-content">
          <h3 className="task-list-item-title">Title</h3>
          <p className="task-list-item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam
            architecto praesentium iusto sed eum dolorem molestias quod
            quibusdam neque!
          </p>
          <div className="task-list-item-extra-info">
            <div className="extra-item">
              <NodeIndexOutlined />
              <p>2</p>
            </div>
            <div className="extra-item">
              <CommentOutlined />
              <p>2</p>
            </div>
            <div className="extra-item">
              <TagOutlined />
              <p>2</p>
            </div>
          </div>
        </div>
      </div>
      <div className="clear" />
    </>
  );
}

export default TaskListItem;
