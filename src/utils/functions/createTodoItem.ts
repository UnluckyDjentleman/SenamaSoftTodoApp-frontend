import TodoItem from "../../constants/todoItem";
import TodoItemsAPI from "../api";

export async function CreateTodoItem(dto: Omit<TodoItem,'id'|'start_date'|'status'>){
    try{
        const resp=await TodoItemsAPI.AddNewTodoItem(dto);
        return resp;
    }
    catch(e){
        throw e;
    }
}