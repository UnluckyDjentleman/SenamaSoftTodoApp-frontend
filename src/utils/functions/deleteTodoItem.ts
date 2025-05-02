import TodoItemsAPI from "../api";

export async function DeleteTodoItem(id:string){
    try{
        const resp=await TodoItemsAPI.DeleteTodoItem(id);
        return resp;
    }
    catch(err){
        throw err
    }
}