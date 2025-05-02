import { Flex, Spin } from "antd"

export default function Loader(){
    return (
       <Flex style={{justifyContent: 'center', alignItems: 'center'}} children={[
        <Spin size="large"/>
       ]}></Flex>
    )
}