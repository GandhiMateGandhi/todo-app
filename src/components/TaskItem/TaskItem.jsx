import React from 'react';
import './TaskItem.scss'
import {
    styled,
    Switch, Typography
} from "@mui/material";
import check from '../../assets/check.svg'
import cross from '../../assets/cross.svg'
import {useTasks} from "../../context/Context";

const IOSSwitch = styled((props) => (
    <Switch size='large' focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 50,
    height: 30,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url(${check})`,
            },
            '& + .MuiSwitch-track': {
                backgroundColor: '#10C200',
                boxShadow: '0px 0px 10px 3px #00000040 inset',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 26,
        height: 26,
        position: 'relative',
        backgroundColor: '#F4F4F4',
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${cross})`,
        }

    },
    '& .MuiSwitch-track': {
        borderRadius: '25px',
        backgroundColor: '#366EFF',
        boxShadow: '0px 0px 10px 3px #00000040 inset',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const TaskItem = ({id, title, description, checked, date, index}) => {

    const {setTaskChecked} = useTasks()

    const onCheckboxChange = (e) => {
        setTaskChecked(e.target.checked, id, date)
    }


    const colorsArray = ['#FF0000', '#366EFF', '#FFEB33', '#d500f9', '#ff9100', '#00a152', '#03a9f4']

    const colorLine = colorsArray.length <= index ? colorsArray[Math.floor(Math.random() * 6)] : colorsArray[index]

    return (
        <div className="TaskItem">
            <div className="TextBlock">
                <span className={`TextBlock_colorLine`} style={{backgroundColor: colorLine}}></span>
                <Typography variant="h3" className={`TextBlock_title ${checked ? 'TextBlock_title__checked' : ''}`}>
                    {title}
                </Typography>
                <Typography className="TextBlock_description">{description}</Typography>
            </div>
            <IOSSwitch checked={checked} onChange={onCheckboxChange} sx={{m: 1}}/>
        </div>
    );
};

export default TaskItem;