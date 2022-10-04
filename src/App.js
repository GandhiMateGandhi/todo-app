import './App.scss';
import TaskBlock from "./components/TaskBlock/TaskBlock";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Header from "./components/Header/Header";
import TodayTasks from "./components/TodayTasks/TodayTasks";
import {useTasks} from "./context/Context";
import dayjs from "dayjs";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import NewsTicker from "./components/NewsTicker/NewsTicker";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const queryClient = new QueryClient()

function App() {
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

    const {taskList} = useTasks()

    const upcomingTasks = taskList.filter(task => {
        return task.date !== dayjs().format('MM.DD.YYYY')
    })
    const sortedTasks = upcomingTasks.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <div className="Container">
                    <Header/>
                    <TodayTasks/>
                    {sortedTasks.map((dayTasks, index) => <TaskBlock key={index} dayTasks={dayTasks}/>)}
                </div>
                <NewsTicker/>
            </ThemeProvider>
        </QueryClientProvider>

    );
}

export default App;
