import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { RFFixed, RFLayout, RFPane } from '../layout/layout'
import { Button, Collapse } from 'antd'
import { BankFilled, SearchOutlined, RadarChartOutlined, CalendarFilled, BugFilled } from '@ant-design/icons';
import "antd/dist/antd.css"


const { Panel } = Collapse;

interface PWorkBench {

}

const WorkBench: FC<PWorkBench> = function () {
    const dispatch = useDispatch()

    return (<RFLayout direction="row">
        <RFFixed>
            <ActivityBar></ActivityBar>
        </RFFixed>
        <RFPane resize={true} style={{ flex: '0.3 1' }}><NavgationBar></NavgationBar></RFPane>
        <RFPane>
            <RFLayout direction="column" >
                <RFPane resize={true}>editor</RFPane>
                <RFPane>panel</RFPane>
            </RFLayout>
        </RFPane>
    </RFLayout>)
}


const ActivityBar = function () {
    return (
        <div className="application-activity-bar" style={{ width: "50px" }}>
            <Button block={true} size="large" icon={<BankFilled />}></Button>
            <Button block={true} size="large" icon={<SearchOutlined />}></Button>
            <Button block={true} size="large" icon={<RadarChartOutlined />}></Button>
            <Button block={true} size="large" icon={<CalendarFilled />}></Button>
            <Button block={true} size="large" icon={<BugFilled />}></Button>
        </div>
    )
}

const NavgationBar = function () {
    return (
        <div className="application-navgatioon-bar">
            <Collapse defaultActiveKey={['1']} >
                <Panel header="This is panel header 1" key="1">
                    <p>111</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                    <p>222</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                    <p>333</p>
                </Panel>
            </Collapse>
        </div>
    )

}


export default WorkBench