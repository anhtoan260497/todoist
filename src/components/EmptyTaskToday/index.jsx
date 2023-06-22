import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import clsx from 'clsx';
import { useSelector } from 'react-redux';

EmptyTaskToday.propTypes = {
    
};

function EmptyTaskToday(props) {

    const isActiveMenu = useSelector((state) => state.menuReducer.isActiveMenu);

    return (
        <div
        className={clsx(
          "no-task-display",
          isActiveMenu && "minimize-app-right"
        )}
      >
        <img
          src="https://todoist.b-cdn.net/assets/images/6ececcf18613e1109751081be6eda314.jpg"
          alt="no-job"
        />

        <p className='description-no-task description-bold'>What do you need to get done today?</p>
        <p className='description-no-task description-light'>By default, tasks added here will be due today. Click + to add a task</p>
    </div>
    );
}

export default EmptyTaskToday;