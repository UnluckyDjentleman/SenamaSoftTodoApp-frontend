import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteButton({onClick}:{onClick: ()=>void}){
    return (
        <DeleteOutlined onClick={onClick}/>
    )
}