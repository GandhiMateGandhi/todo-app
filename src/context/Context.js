import {createContext, useContext, useState} from "react";
import {v4} from "uuid"
import dayjs from "dayjs";

const Context = createContext()
export const useTasks = () => useContext(Context)

export function TaskProvider({children}) {
    const today = dayjs().format('MM.DD.YYYY')
    const description = 'Lorem ipsum dolor sit amet.'
    const [isTickerVisible, setIsTickerVisible] = useState(true)
    const [taskList, setTaskList] = useState([
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
            date: '10.09.2022',
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
            date: '10.11.2022',
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

    const addTask = (title, description, date) => {
        const addedTask = taskList.find(task => task.date === date)

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

    const setTaskChecked = (checked, id, date) => {
        if (date === today) {
            const checkedTask = taskList[0].tasks.find(task => task.id === id)
            checkedTask.checked = !checkedTask.checked

            setTaskList([...taskList])
        } else {
            const taskBlock = taskList.find(item => item.date === date)
            const checkedTask = taskBlock.tasks.find(task => task.id === id)
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