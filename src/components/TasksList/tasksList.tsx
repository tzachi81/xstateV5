import React, { useEffect, useMemo, useState } from 'react';
import classes from './tasksList.module.scss';

import { rootActorActions } from '../../machines';
import { Button, ITaskAction } from '../Button';

interface ITasksList {
    tasks: string[];
}

export const TasksList: React.FC<ITasksList> = ({ tasks }) => {

    
    const onButtonClick = (task: string) => {
        const removeTaskAction: ITaskAction = {
            action: 'REMOVE_TASK',
            params: task
        }
        return removeTaskAction
        
    }

    return (
        <div className={classes.tasks}>
            <h1>To Do list</h1>
            <ul>
                {tasks?.map((task, index) =>
                    <span key={`task-${index}`}>
                        <li>{task}</li>
                        <Button title={'Remove'} buttonClickAction={onButtonClick(task)}></Button>
                    </span>
                )}
            </ul>
        </div>
    )
}
