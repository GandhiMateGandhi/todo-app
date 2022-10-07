import React, {FC} from 'react';
import './NewsTicker.scss'
import {useQuery} from "react-query";
import {Typography} from "@mui/material";
import Context from "../../context/Context";
import {TaskListContextType} from "../../@types/types";


const NewsTicker: FC = () => {
    const {isTickerVisible} = React.useContext(Context) as TaskListContextType;

    const {isLoading, error, data} = useQuery(['repoData'], () =>
        fetch('https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 99)).then(res =>
            res.json()
        )
    )

    if (error) alert(error)

    return (
        <div className="NewsTicker" style={{opacity: isTickerVisible ? 1 : 0}}>
            <Typography>{isLoading ? 'Loading...' : data.body}</Typography>
        </div>
    );
};

export default NewsTicker;