import React, {FC, useState} from 'react';
import './Header.scss'
import {Box, IconButton, Modal, Switch, Typography} from "@mui/material";
import cog from "../../assets/cog.svg";
import Context from "../../context/Context";
import {TaskListContextType} from "../../@types/types";

const Header: FC = () => {
    const {isTickerVisible, setIsTickerVisible} =  React.useContext(Context) as TaskListContextType;
    const [open, setOpen] = useState<boolean>(false);


    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setOpen(true)
    };
    const handleClose = (e: React.MouseEvent | React.KeyboardEvent): void => {
        setOpen(false)
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsTickerVisible(!isTickerVisible)
    }

    const style = {
        bgcolor: 'background.paper',
        color: 'primary.main',
        boxShadow: 24,
        p: 4,
    };

    return (
        <header className="Header">
            <Typography variant="h1">To Do</Typography>
            <IconButton onClick={handleOpen} aria-label="delete">
                <img src={cog} alt="Settings icon"/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style} className="SettingModal">
                    <Typography id="modal-modal-title" variant="h6" component="h3">News ticker</Typography>
                    <Switch checked={isTickerVisible}
                            onChange={changeHandler}
                            color="default"/>
                </Box>
            </Modal>
        </header>
    );
};

export default Header;