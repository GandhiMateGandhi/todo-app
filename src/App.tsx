import './App.scss';
import TaskBlock from "./components/TaskBlock/TaskBlock";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Header from "./components/Header/Header";
import TodayTasks from "./components/TodayTasks/TodayTasks";
import dayjs from "dayjs";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import NewsTicker from "./components/NewsTicker/NewsTicker";
import React, {FC} from "react";
import Context from "./context/Context";
import {TaskListContextType, ITaskList} from "./@types/types";

const queryClient = new QueryClient()

const App: FC = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#fbfdff',
            },
            secondary: {
                main: '#282828',
            },
            background: {
                paper: '#282828'
            },
        },
    });

    const {taskList} = React.useContext(Context) as TaskListContextType;

    const upcomingTasks = taskList.filter((task: ITaskList) => {
        return task.date !== dayjs().format('MM.DD.YYYY')
    })
    const sortedTasks = upcomingTasks.sort((a: ITaskList, b: ITaskList) =>
        (dayjs(a.date, 'MM.DD.YYYY').isAfter(dayjs(b.date, 'MM.DD.YYYY')) ? 1 : -1))

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <div className="Container">
                    <Header/>
                    <TodayTasks/>
                    {sortedTasks.map((dayTasks: ITaskList, index: number) =>
                        <TaskBlock key={index} date={dayTasks.date} tasks={dayTasks.tasks}/>)}
                </div>
                <NewsTicker/>
            </ThemeProvider>
        </QueryClientProvider>

    );
}

export default App;
