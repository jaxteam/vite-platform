
import MicroApp from './micro/react'
import { routes } from './router'
import { createBrowserHistory, createHashHistory } from 'history'
import { FC } from 'react'
import { RFFixed, RFLayout, RFPane } from './layout/layout'
import { Button, Collapse, List, Space, Tree, Typography } from 'antd'
import { ApiOutlined, CopyOutlined, DatabaseOutlined, DeleteOutlined, DisconnectOutlined, EditOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons'



// const App = new MicroApp({
//   routes,
//   history: createHashHistory()
// }).
// render(document.getElementById("root")||document.body)
const { Panel } = Collapse;

const App: FC = function () {

  const data=["我的数据","我的连接","我的资源"]
  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];
  return (
    <RFLayout direction="column">
      <RFFixed><Button icon={<HomeOutlined />} href="/#/list"></Button>
      </RFFixed>
      <RFLayout direction="row">
      <RFPane resize={true} style={{ flex: '0.25 1', flexDirection: 'column' }}>
        <Collapse defaultActiveKey={['1']} style={{height:'100%'}}>
          <Panel header="我的数据源" key="1">
            <List
              // bordered
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  {/* <Typography.Text mark>[ITEM]</Typography.Text> */}
                  <a href="/#/list">{item}</a>
                </List.Item>
              )}
            />
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <Space>
              <Button icon={<PlusOutlined />}></Button>
              <Button icon={<DeleteOutlined />}></Button>
              <Button icon={<EditOutlined />}></Button>
              <Button icon={<ApiOutlined />}></Button>
              <Button icon={<DisconnectOutlined />}></Button>
            </Space>
          <Tree
            checkable
            // onExpand={onExpand}
            // expandedKeys={expandedKeys}
            // autoExpandParent={autoExpandParent}
            // onCheck={onCheck}
            // checkedKeys={checkedKeys}
            // onSelect={onSelect}
            // selectedKeys={selectedKeys}
            treeData={treeData}
          />
           
          </Panel>
        </Collapse>
      </RFPane>
      <RFPane>
        <MicroApp routes={routes} history={createHashHistory()} entry="/list"></MicroApp>
      </RFPane>
      </RFLayout>
      <RFPane style={{ flex:'0 20px'}}>
        footer
      </RFPane>
    </RFLayout>)
}

export default App
