import React, {useState} from 'react';
import './Header.scss'
import {Box, IconButton, Modal, Switch, Typography} from "@mui/material";
import cog from "../../assets/cog.svg";
import {useTasks} from "../../context/Context";

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {isTickerVisible, setIsTickerVisible} = useTasks()


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
                            onChange={(e) => setIsTickerVisible(!isTickerVisible)}
                            color="default"/>
                </Box>
            </Modal>
        </header>
    );
};

export default Header;