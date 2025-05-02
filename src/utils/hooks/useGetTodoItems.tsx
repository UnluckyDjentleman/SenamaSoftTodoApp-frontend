import { useEffect } from "react";
import FilterString from "../../constants/filterString";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setError, setLoad, setTodoItems } from "../../store/reducers/todoItemReducer";
import TodoItemsAPI from "../api";
import { AxiosError } from "axios";
import TodoItem from "../../constants/todoItem";

export default function useGetTodoItems(filter: FilterString){
    const {error, load, items}=useAppSelector(state=>state.todo);

    const dispatch=useAppDispatch();

    useEffect(()=>{
        dispatch(setLoad({load: true}));
        TodoItemsAPI.GetItems(filter).then((data: TodoItem[])=>{
            dispatch(setLoad({load: false}));
            dispatch(setTodoItems({items: data}));
            dispatch(setError({error:null}));
        }).catch((e: AxiosError)=>{
            dispatch(setLoad({load: false}));
            dispatch(setError({error: e.message}))
        })
    },[dispatch, filter]);

    return {error, load, items}
}