import { Col, Flex } from "antd";
import DatePick from "../shared/datePicker/datePick";
import SelectComponent from "../shared/select/selectComponent";
import ButtonComponent from "../shared/button/buttonComponent";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useRedux";
import { setFilter } from "../../store/reducers/filterReducer";
import { Status } from "../../constants/status";

export default function Header(){

    const filters=useAppSelector(state=>state.filter.filter)
    const dispatch=useAppDispatch()

    return (
        <Flex gap={'small'} justify={'center'} style={{padding: '2%'}} wrap children={[
            <>
                <Col>
                    <DatePick placeholder="From" 
                    value={filters.from?new Date(filters.from):undefined} 
                    setValue={(dateFrom: Date)=>dispatch(setFilter({filter: {...filters, from: dateFrom}}))}></DatePick>
                </Col>
                <Col>
                    <DatePick placeholder="To" value={filters.to?new Date(filters.to):undefined} 
                    setValue={(dateTo: Date)=>dispatch(setFilter({filter: {...filters, to: dateTo}}))}></DatePick>
                </Col>
                <Col>
                    <SelectComponent value={filters.status?filters.status:undefined} 
                        onChange={(status: Status|undefined)=>dispatch(setFilter({filter: {...filters, status}}))}></SelectComponent>
                </Col>
                <Col>
                    <ButtonComponent type="solid" text="Reset Filters" onClick={()=>dispatch(setFilter({filter:{
                        from: undefined,
                        to: undefined,
                        status: undefined,
                    }}))}></ButtonComponent>
                </Col>
            </>
        ]}/>
    )
}