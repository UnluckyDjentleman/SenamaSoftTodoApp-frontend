import { Select } from "antd";
import { Status } from "../../../constants/status";

export default function SelectComponent({value, onChange}:{value: Status|undefined, onChange:(x: Status|undefined)=>void}){
    return (
        <Select<Status | null>
          value={value ?? null}
          style={{ width: 320 }}
          onChange={(val) => onChange(val ?? undefined)} 
          options={[
            { value: null, label: "" },
            ...Object.values(Status).map(el => ({ 
              value: el, 
              label: el 
            }))
          ]}
        />
      );
}