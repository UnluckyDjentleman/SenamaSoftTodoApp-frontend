import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

export default function DatePick({placeholder, value, setValue}:{placeholder: string, 
    value:Date|undefined, 
    setValue:(x: Date)=>void}){

    const dayjsValue = value ? dayjs(value) : undefined;

    const handleChange = (newValue: Dayjs | null) => {
        if (newValue) {
            setValue(newValue.toDate());
        } else {
            setValue(undefined!);
        }
    };   
    return(
        <DatePicker 
            placeholder={placeholder}
            value={dayjsValue}
            onChange={handleChange}
            ></DatePicker>
    )
}