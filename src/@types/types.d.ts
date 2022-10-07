export interface ITaskBlock {
    date: string;
    tasks: object[];
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    checked: boolean;
}
export interface ITaskItem {
    id: string;
    title: string;
    description: string;
    checked: boolean;
    date: string;
    index: number
}

export interface ITaskList {
    date: string;
    tasks: ITask[];
}

export type TaskListContextType = {
    taskList: ITaskList[];
    today: string;
    addTask: (title: string, description: string, date: string) => void;
    setTaskChecked: (checked: boolean, id: string, date: string) => void;
    isTickerVisible: boolean;
    setIsTickerVisible: (active: boolean) => void
}

