import FilterString from "../constants/filterString";
import axios from "axios";
import TodoItem from "../constants/todoItem";

export default class TodoItemsAPI{
    public static async GetItems(filterParams: FilterString){
        const resp=await axios.get(process.env.REACT_APP_API_URL as string, {
            withCredentials: true,
            params:{
                from: filterParams.from,
                to: filterParams.to,
                status: filterParams.status
            }
        });
        return resp.data;
    }

    public static async AddNewTodoItem(dto: Omit<TodoItem,'id'|'start_date'|'status'>){
        const {title, deadline_date, description}=dto;

        const resp=await axios.post(process.env.REACT_APP_API_URL as string, {
            title,
            deadline_date,
            description
        },{
            withCredentials: true
        });

        return resp.data;
    }

    public static async UpdateTodoItem(id: string, dto: Partial<Omit<TodoItem,'id'|'start_date'>>){
        const {title, description, deadline_date, status}=dto;
        const resp=await axios.put(process.env.REACT_APP_API_URL as string+"/"+id, {
            title,
            deadline_date,
            description,
            status
        },{
            withCredentials: true
        });

        return resp.data;
    }

    public static async DeleteTodoItem(id:string){
        const resp=await axios.delete(process.env.REACT_APP_API_URL as string+"/"+id,{
            withCredentials: true
        });

        return resp.data;
    }
}