import React, {useState} from 'react';
import './TodayTasks.scss'
import TaskItem from "../TaskItem/TaskItem";
import {Checkbox, Typography} from "@mui/material";
import checked from '../../assets/checkbox-checked.svg'
import CreateTask from "../CreateTask/CreateTask";
import {useTasks} from "../../context/Context";

const TodayTasks = () => {
    const {taskList, today} = useTasks()
    const [todayTasksCheckbox, setTodayTasksCheckbox] = useState(true);

    const todayTasks = taskList.find(task => {
        return task.date === today
    }).tasks

    return (
        <div className="TodayTasks">
            <div className="TodayTasksHeader">
                <div className="TodayTasksCheckbox">
                    <Checkbox onChange={(e) => setTodayTasksCheckbox(e.target.checked)}
                              checkedIcon={<img src={checked} alt="Checkbox checked icon"/>}
                              label="Today Tasks:" defaultChecked/>
                    <Typography className="TodayTasksCheckbox_label" variant="span">Today Tasks:</Typography>
                </div>
                <CreateTask/>

            </div>
            {todayTasksCheckbox && <div className="TodayTasksList">
                {todayTasks.map((task, index) => {
                    return <TaskItem key={task.id} index={index} date={today} {...task}/>
                })}
            </div>}
        </div>
    );
};

export default TodayTasks;