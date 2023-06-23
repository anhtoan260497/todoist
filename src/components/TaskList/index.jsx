import React from 'react';
import PropTypes from 'prop-types';
import EmptyTaskToday from '../EmptyTaskToday';
import './styles.scss'
import TaskListItem from '../TaskListItem';

TaskList.propTypes = {
    
};

function TaskList(props) {
    return (
        <div className='task-list-container '>
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />

            


            {/* if no task and path is  /app/today/ show this component */}
            {/* <EmptyTaskToday /> */}
        </div>
    );
}

export default TaskList;