import TodoItem from "../../constants/todoItem";
import TodoItemsAPI from "../api";

export async function UpdateTodoItem(id: string, dto: Partial<TodoItem>){
    try{
        const resp=await TodoItemsAPI.UpdateTodoItem(id, dto);
        return resp;
    }
    catch(e){
        throw e
    }
}