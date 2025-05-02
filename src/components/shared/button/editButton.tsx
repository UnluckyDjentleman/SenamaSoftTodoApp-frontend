import { EditOutlined } from "@ant-design/icons";

export default function EditButton({onClick}:{onClick: ()=>void}){
    return(
        <EditOutlined onClick={onClick}/>
    )
}