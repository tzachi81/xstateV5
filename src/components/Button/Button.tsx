import React, { useEffect, useMemo, useState } from 'react';
import classes from './button.module.scss';
import classNames from 'classnames';

import { rootActor, rootActorActions } from '../../machines';
import { tasksActorActions } from '../../machines/tasksMachine';


export interface ITaskAction{
    action: keyof typeof tasksActorActions,
    params?: any
}

interface IButtonProps {
    title: string,
    buttonClickAction: ITaskAction
}

export const Button: React.FC<IButtonProps> = ({ title, buttonClickAction }) => {

    const [isRootMachineActive, setRootMachineActive] = useState(false);

    rootActor.subscribe(snapshot => {
        setRootMachineActive(snapshot.value === 'Active')
    });

    useEffect(() => {
        setRootMachineActive(!rootActorActions.CURRENT_STATE);
    }, []);

    const buttonClasses = useMemo(() => {
        return classNames(classes.button, {
            [classes.active]: isRootMachineActive,
            [classes.inactive]: !isRootMachineActive
        })
    }, [isRootMachineActive]);

    const onclick = () => {       
        const {action, params} = buttonClickAction;
        if (action === 'TOGGLE'){
            rootActorActions[action]();
        }else{
            tasksActorActions[action](params);
        } 
    }

    return <button
        className={buttonClasses}
        onClick={onclick}>{title}</button>;

}