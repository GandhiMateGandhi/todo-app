import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import arrow from '../../assets/arrow.svg'
import TaskItem from "../TaskItem/TaskItem";
import './TaskBlock.scss'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TaskBlock = ({dayTasks}) => {
    const {date, tasks} = dayTasks
    const tomorrow = dayjs().add(1, 'day').format("MM.DD.YYYY")
    const upcomingDate = dayjs(date).format('DD/MM')

    return (
        <Accordion style={{borderRadius: '25px'}} className="TaskBlock">
            <AccordionSummary
                expandIcon={<img src={arrow} alt="Arrow icon"/>}
                aria-controls="panel1a-content"
                id="panel1a-header"

            >
                <Typography variant="h3" className="TaskBlock_title">
                    {`${tomorrow === date ? 'Tomorrow' : upcomingDate}  Tasks`}
                </Typography>

            </AccordionSummary>
            <AccordionDetails>
                {tasks?.map((task, index) => <TaskItem key={task.id} {...task} index={index} date={date}/>)}
            </AccordionDetails>
        </Accordion>
    );
};

export default TaskBlock;