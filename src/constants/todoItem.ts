import { Status } from "./status";

interface TodoItem{
    id: string,
    title: string,
    description: string,
    start_date: Date,
    deadline_date: Date,
    status: Status
}

export default TodoItem;