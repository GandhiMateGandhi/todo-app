import React, {FC, useState} from 'react';
import './TodayTasks.scss'
import TaskItem from "../TaskItem/TaskItem";
import {Checkbox, Typography} from "@mui/material";
import checked from '../../assets/checkbox-checked.svg'
import CreateTask from "../CreateTask/CreateTask";
import Context from "../../context/Context";
import {ITask, TaskListContextType} from "../../@types/types";

const TodayTasks: FC = () => {
    const {taskList, today} = React.useContext(Context) as TaskListContextType;
    const [todayTasksCheckbox, setTodayTasksCheckbox] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodayTasksCheckbox(event.target.checked);
    };

    const todayTasks = taskList.find(task => {
        return task.date === today
    })?.tasks

    return (
        <div className="TodayTasks">
            <div className="TodayTasksHeader">
                <div className="TodayTasksCheckbox">
                    <Checkbox checked={todayTasksCheckbox}
                              onChange={handleChange}
                              checkedIcon={<img src={checked} alt="Checkbox checked icon"/>}
                    />
                    <Typography className="TodayTasksCheckbox_label">Today Tasks:</Typography>
                </div>
                <CreateTask/>

            </div>
            {todayTasksCheckbox && <div className="TodayTasksList">
                {todayTasks?.map((task: ITask, index) => {
                    return <TaskItem key={task.id} index={index} date={today} {...task}/>
                })}
            </div>}
        </div>
    );
};

export default TodayTasks;