import React from 'react';
import './NewsTicker.scss'
import {useQuery} from "react-query";
import {Typography} from "@mui/material";
import {useTasks} from "../../context/Context";

const NewsTicker = () => {
    const {isTickerVisible} = useTasks()

    const {isLoading, error, data} = useQuery(['repoData'], () =>
        fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 99)).then(res =>
            res.json()
        )
    )


    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="NewsTicker" style={{opacity: isTickerVisible ? 1 : 0}}>
            <Typography>{isLoading ? 'Loading...' : data.body}</Typography>
        </div>
    );
};

export default NewsTicker;