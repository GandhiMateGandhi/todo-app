import {createContext, FC, ReactNode, useState} from "react";
import dayjs from "dayjs";
import {ITaskList, ITask, TaskListContextType} from "../@types/types";
import {v4} from "uuid";

interface ContextProps {
    children: ReactNode
}

const Context = createContext<TaskListContextType | null>(null)

export const TaskProvider: FC<ContextProps> = ({children}) => {
    const today = dayjs().format('MM.DD.YYYY')
    const description = 'Lorem ipsum dolor sit amet.'
    const [isTickerVisible, setIsTickerVisible] = useState<boolean>(true)
    const [taskList, setTaskList] = useState<ITaskList[]>([
        {
            date: today,
            tasks: [
                {
                    id: v4(),
                    title: 'Visit David',
                    description,
                    checked: false,
                },
                {
                    id: v4(),
                    title: 'Groceries For Dinner',
                    description,
                    checked: false,
                },
                {
                    id: v4(),
                    title: 'Fix Dad’s iPad',
                    description,
                    checked: true,
                }
            ]
        },
        {
            date: dayjs().add(1, 'day').format("MM.DD.YYYY"),
            tasks: [
                {
                    id: v4(),
                    title: 'Call mom',
                    description,
                    checked: false,
                },
                {
                    id: v4(),
                    title: 'Cinema at 8pm',
                    description,
                    checked: false,
                }
            ]
        },
        {
            date: '11.09.2022',
            tasks: [
                {
                    id: v4(),
                    title: 'Send test task',
                    description,
                    checked: false,
                }
            ]
        },
        {
            date: '11.11.2022',
            tasks: [
                {
                    id: v4(),
                    title: 'Meet sister at airport',
                    description,
                    checked: false,
                }
            ]
        }
    ])

    const addTask = (title: string, description: string, date: string) => {
        const addedTask = taskList.find((task: ITaskList) => task.date === date)

        if (addedTask) {
            addedTask.tasks.push({
                id: v4(), title, description, checked: false
            })
            setTaskList([...taskList])
        } else {
            setTaskList([...taskList,
                {
                    date,
                    tasks: [{
                        id: v4(), title, description, checked: false
                    }]
                }
            ])
        }
    }

    const setTaskChecked = (checked: boolean, id: string, date: string) => {
        if (date === today) {
            const checkedTask = taskList[0].tasks.find((task: ITask) => task.id === id) || taskList[0].tasks[0]
            checkedTask.checked = !checkedTask.checked

            setTaskList([...taskList])
        } else {
            const taskBlock = taskList.find((item: ITaskList) => item.date === date)
            const checkedTask = taskBlock?.tasks.find((task: ITask) => task.id === id) || taskList[0].tasks[0]
            checkedTask.checked = !checkedTask.checked

            setTaskList([...taskList])
        }
    }

    return (
        <Context.Provider value={{taskList, today, addTask, setTaskChecked, isTickerVisible, setIsTickerVisible}}>
            {children}
        </Context.Provider>
    )
}

export default Context;