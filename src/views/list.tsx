import React, { FC, useEffect, useState } from 'react'
import { IAction, IReducerState, IModel, PK, IParams } from './interface';
import Table, { TableProps } from 'antd/lib/table';
import Action from './actions';
import { Button, Divider, Drawer, PageHeader, Space, Tag } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Mock from 'mockjs'
import { useHistory, useNavigation } from '../micro/useMicro';
import { useActions, useRowSelection } from '../hook';

const namespace = "list"

export interface ListProps<M> {
  actions: IAction;
  reducer: IReducerState;
  items: M[];
  item: M;
}

type IPList = ListProps<IModel>


//NOTE: 组件会不会拆的太细了

const Toolbar: FC<IPList> = function (props: IPList) {
  const { t } = useTranslation();
  //@ts-ignore
  const {selectedRowKeys,setSelectedRowKeys} = props
  const {viewPath} = useNavigation()
  return (
    <Space>
      <Button icon={<EditOutlined />} disabled={selectedRowKeys.length === 0} >
        {t('GLOBAL.EDIT')}
      </Button>
      <Button icon={<DeleteOutlined />}  disabled={selectedRowKeys.length === 0} danger>
        {t('GLOBAL.REMOVE')}
      </Button>
      <Button icon={<ClearOutlined />} disabled={selectedRowKeys.length === 0} onClick={()=>{
        setSelectedRowKeys([])
      }}>
        <span>selected {selectedRowKeys.length} rows! </span>
      </Button>
     
    </Space>
  );
}

const Datatable: FC<IPList> = function (props: IPList) {
  const [selectedRowKeys,setSelectedRows] = useRowSelection("rowkey")
  const {naviagtorName} = useNavigation()
  let tableConf: TableProps<any> = {
    rowKey: 'userId',
    dataSource: props.items,
    columns: [
      {
        title: "数据源名称",
        key: 'name',
        dataIndex: 'name',
        width: 180
      },
      {
        title: "数据源类型",
        key: 'datasource',
        dataIndex: 'datasource',
        filters: [
          { text: 'mysql', value: 'London' },
          { text: 'Oracle', value: 'New York' },
          { text: 'PG', value: 'New York' },
        ],
        filteredValue:  null,
        onFilter: (value, record) => record.address.includes(value),
        width: 180
      },
      {
        title: "服务地址",
        key: 'ip',
        dataIndex: 'ip',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
        },
        width: 180
      },
      {
        title: "端口",
        key: 'port',
        dataIndex: 'port',
        width: 80
      },
      {
        title: "状态",
        key: 'status',
        dataIndex: 'status',
        width: 80,
        render:function(value:any,record:any){
          return !value ?(<Tag color="red">不可用</Tag>):(<Tag color="green">可用</Tag>)
        }
      },
      {
        title: 'GLOBAL.COLUMNS.OPTIONS',
        key: 'options',
        dataIndex: 'options',
        width: 190,
        // render: tableOpt
      }
    ],
    onRow:function(record){
        return {
          onClick: event => {
            // console.log(event,record)
          }, // 点击行
          onDoubleClick: event => {
            // console.log(event,record)
            naviagtorName("demo.detail")
          },
          onContextMenu: event => {},
          onMouseEnter: event => {}, // 鼠标移入行
          onMouseLeave: event => {},
        };
    }
  };
  
  const rowSelection = {
    onSelect:function(record:any, selected:Boolean, selectedRows:any, nativeEvent:string){
      console.log("onSelect:",record,selected,selectedRows,nativeEvent)
    },
    onChange: (selectRowKeys: any, selectRows:any)=>{
      console.log(`selectRowKeys: ${selectRowKeys}`, 'selectRows: ', selectRows);
      //@ts-ignore
      setSelectedRows(selectRows)
      // setSelectedRowKeys(selectRowKeys)
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.id === 1, // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
    {
      <Toolbar {...props} 
    //@ts-ignore
    selectedRowKeys={selectedRowKeys}
    // setSelectedRowKeys={setSelectedRowKeys}
    ></Toolbar>
    }
    <Table
    //@ts-ignore  
      rowSelection={rowSelection}
      {...tableConf}
      rowKey='id'
      size="small"
    />
    </>
  );
}


const ListView: FC<IPList> = function (props: IPList) {
  const params = { a: 1 }
  const [actions] = useActions<IAction>(Action, namespace)
  const history = useHistory()
  const {navigatorURL,naviagtorName,viewPath} = useNavigation()

  useEffect(function () {
    actions.fetchPage(params)
  }, [1])

  const mockjson={
    "data|200":[{
    id:"@id",
    name:"@cname",
    datasource:"@pick(['oracle','mysql','pg'])",
    ip:"@ip",
    port:"@integer(1024,65535)",
    statue:"@boolean"
    }]
  }
  const data = Mock.mock(mockjson)
  return (
    <PageHeader
      className="site-page-header"
      title="数据源管理"
      subTitle="数据源列表"
      extra={
        <Button type="primary" href={viewPath("demo.edit")}>添加新数据源</Button>
      }
    >
      <Datatable {...props} items = {data.data} actions={actions} ></Datatable>
    </PageHeader>
  );
}


export default ListView


