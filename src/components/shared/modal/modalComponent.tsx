import { DatePicker, Form, Input, message, Modal } from "antd";
import TodoItem from "../../../constants/todoItem";
import { useEffect } from "react";
import dayjs from "dayjs";
import { CreateTodoItem } from "../../../utils/functions/createTodoItem";
import { useAppDispatch } from "../../../utils/hooks/useRedux";
import { addTodoItem, updateTodoItem } from "../../../store/reducers/todoItemReducer";
import { UpdateTodoItem } from "../../../utils/functions/updateTodoItem";

export default function ModalComponent({item, isOpened, setIsOpened}:{item: TodoItem|undefined, isOpened: boolean, setIsOpened: (x:boolean)=>void}){
    const [form] = Form.useForm();

    const [messageApi, contextHolder]=message.useMessage()

    const dispatch=useAppDispatch()

    useEffect(() => {
        if (isOpened) {
            form.setFieldsValue({
                title: item?.title || '',
                description: item?.description || '',
                deadline_date: item?.deadline_date ? dayjs(item.deadline_date) : undefined
            });
        }
    }, [item, isOpened, form]);

    const handleSubmit=(values:any)=>{
        if(item){
            const data: Partial<TodoItem>={
                title: values.title,
                description: values.description,
                deadline_date: values.deadline_date.toDate()
            }
            UpdateTodoItem(item.id, data).then((data:TodoItem)=>{
                dispatch(updateTodoItem({item:data}));
                messageApi.open({
                    type: 'success',
                    content: 'Item is updated successfully'
                })
                setIsOpened(false)
            }).catch(err=>messageApi.open({
                type:'error',
                content: err.response.data.message
            }));
        }
        else{
            const data: Omit<TodoItem,'id'|'start_date'|'status'>={
                title: values.title,
                description: values.description,
                deadline_date: values.deadline_date.toDate()
            }
            CreateTodoItem(data).then((data:TodoItem)=>{
                dispatch(addTodoItem({item:data}))
                messageApi.open({
                    type: 'success',
                    content: 'Item is created successfully'
                })
                setIsOpened(false)
            }).catch(err=>messageApi.open({
                type:'error',
                content: err.response.data.message
            }));
        }
    }

    return(
        <Modal title={!item?"New Todo Item":"Update Todo Item"} open={isOpened} onOk={form.submit} onCancel={()=>{
            setIsOpened(!isOpened)
        }} forceRender>
            {contextHolder}
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                    <Input.TextArea></Input.TextArea>
                </Form.Item>
                <Form.Item name="deadline_date" label="Deadline" rules={[{ required: true }]}>
                <DatePicker
                    format="DD/MM/YYYY hh:mm A"
                    showTime={{ use12Hours: false }}
                ></DatePicker>
                </Form.Item>
            </Form>
        </Modal>
    )
}