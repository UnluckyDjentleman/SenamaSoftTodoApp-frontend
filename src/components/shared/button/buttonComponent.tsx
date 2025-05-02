import { Button } from "antd";

export default function ButtonComponent({type, text, onClick}:{type: "link" | "text" | "dashed" | "outlined" | "solid" | "filled" | undefined, text:string, onClick: ()=>void}){
    return(
        <Button variant={type} onClick={onClick} color='purple' style={{marginLeft: "15px"}}>{text}</Button>
    )
}