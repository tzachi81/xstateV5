import React, { useState } from 'react';
import classes from '../MainContainer/mainContainer.module.scss';
import { Button, ITaskAction } from '../Button';
import { TasksList } from '../TasksList/tasksList';
import { getTasksState, tasksActor } from '../../machines/tasksMachine';

interface IMainContainer {

}

export const MainContainer: React.FC<IMainContainer> = () => {

    const [tasks, setTasks] = useState<string[]>(getTasksState.tasks);
    const [taskTitle, updateTaskTitle] = useState<string>("");

    const addTaskAction: ITaskAction = {
        action: 'ADD_TASK',
        params: taskTitle
    }

    tasksActor.subscribe(snapshot => setTasks(snapshot.context.tasks));

    return (
        <div className={classes.mainContainer}>

            <div className={classes.tasksFormContainer}>
                <Button title="Toggle Root Machine" buttonClickAction={{ action: 'TOGGLE' }} />
                <span>
                    <input name="taskInput" value={taskTitle} onChange={e => updateTaskTitle(e.target.value)} />
                    <Button title='Add Task' buttonClickAction={addTaskAction} />
                </span>
            </div>

            <TasksList tasks={tasks} />
        </div>
    )
}