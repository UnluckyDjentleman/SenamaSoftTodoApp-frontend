import { Card, Checkbox, Col, Flex, message, Row } from "antd";
import TodoItem from "../../constants/todoItem";
import Meta from "antd/es/card/Meta";
import DeleteButton from "../shared/button/deleteButton";
import EditButton from "../shared/button/editButton";
import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../utils/hooks/useRedux";
import { removeTodoItem, updateTodoItem } from "../../store/reducers/todoItemReducer";
import { DeleteTodoItem } from "../../utils/functions/deleteTodoItem";
import { useState } from "react";
import ModalComponent from "../shared/modal/modalComponent";
import { Status } from "../../constants/status";
import { UpdateTodoItem } from "../../utils/functions/updateTodoItem";

export default function TodoItemComponent({item}:{item: TodoItem}){
    const dispatch=useAppDispatch();

    const [messageApi, contextHolder]=message.useMessage()

    const removeItem=(id:string)=>{
        DeleteTodoItem(id).then((data: TodoItem)=>{
            dispatch(removeTodoItem({item:data}))
            messageApi.open({
                type:"success",
                content: "Item is removed successfully"
            })
        }).catch(err=>{
            messageApi.open({
                type:"error",
                content: err.response.data.message
            })
        });
    }

    const updateTodoItemStatus=(item: TodoItem)=>{
        const updateData:Partial<TodoItem>={
            status: item.status===Status.FINISHED?Status.PUBLISHED:Status.FINISHED,
        }
        UpdateTodoItem(item.id, updateData).then((data: TodoItem)=>{
            dispatch(updateTodoItem({item: data}))
            messageApi.open({
                type:"success",
                content: "Item is updated successfully"
            })
        }).catch(err=>messageApi.open({
            type:"error",
            content: err.response.data.message
        }));
    }

    const [isOpenedModal, setIsOpenedModal]=useState<boolean>(false);

    return(
        <>
            {contextHolder}
            <ModalComponent item={item} isOpened={isOpenedModal} setIsOpened={setIsOpenedModal}></ModalComponent>
            <Card hoverable actions={[
            <EditButton onClick={()=>{
                setIsOpenedModal(true);
            }}/>,
            <DeleteButton onClick={()=>removeItem(item.id)}/>
            ]} title={item.title} style={{width: "80%", margin: "auto", marginTop: "10px"}}
            >
                <Row>
                    <Col span={22}>
                        <Meta description={item.description}></Meta>
                        <Flex style={{gap: "15px"}} children={
                            <>
                                <ClockCircleOutlined size={50}/>
                                <p>
                                {item.start_date.toString()
                                    .replace("T", " ")
                                    .replace("Z", "")
                                    .slice(0, -7)} - {item.deadline_date.toString()
                                    .replace("T", " ")
                                    .replace("Z", "")
                                    .slice(0, -7)}
                                </p>
                            </>
                        }/>
                    </Col>
                    <Col span={2} style={{margin: "auto"}}>
                        <Checkbox checked={item.status===Status.FINISHED?true:false} onChange={()=>updateTodoItemStatus(item)}></Checkbox>
                    </Col>
                </Row>
            </Card>
        </>
    )
}