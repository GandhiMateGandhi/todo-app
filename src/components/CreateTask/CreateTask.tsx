import React, {useState} from 'react';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import './CreateTask.scss'
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Context from "../../context/Context";
import {TaskListContextType} from "../../@types/types";

const CreateTask = () => {
    const {addTask} = React.useContext(Context) as TaskListContextType;


    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const handleDateChange = (date: Dayjs | null) => {
        setDate(date);
    };

    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTask(taskTitle, taskDescription || '...', date?.format('MM.DD.YYYY') || '01.01.2023');
        setTaskTitle('')
        setTaskDescription('')
        setDate(dayjs(new Date()));
        handleClose()
    };

    return (
        <div className="CreateTask">
            <IconButton className="CreateTaskButton" aria-label="add new task" onClick={handleClickOpen}>
                <AddCircleOutlinedIcon fontSize="inherit"/>
            </IconButton>
            <Dialog className="CreateTaskDialog" open={open} onClose={handleClose}>
                <form onSubmit={handleCreate}>
                    <DialogTitle>New task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Task title"
                            type="text"
                            fullWidth
                            variant="standard"
                            required={true}
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                            autoComplete='off'
                            inputProps={{maxLength: 17}}
                        />

                        <TextField
                            margin="dense"
                            id="description"
                            label="Task description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={taskDescription}
                            onChange={e => setTaskDescription(e.target.value)}
                            autoComplete='off'
                            inputProps={{maxLength: 160}}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                className="CreateTaskCalendar"
                                label="Date Picker"
                                inputFormat="DD.MM.YYYY"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateTask;