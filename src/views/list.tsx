import React, { FC, useEffect, useState } from 'react'
// import {
//     Panel
// } from '@mcfed/components';
import { IAction, IReducerState, IModel, PK, IParams } from './interface';
import Table, { TableProps } from 'antd/lib/table';
import { appSelector, containerSelector, querys, querysSelector, spinsSelector } from '@mcfed/core/dist/selector';
import { InjectFactory } from '@mcfed/core';
// import Action from '../action';
import { useDispatch, useSelector } from 'react-redux';
// import { namespace } from '../model';
import { ormSelector, reducerListSelector, reducerModel } from '@mcfed/core/dist/selector/reducerSelector';
import Action from './actions';
import { Button, Divider, PageHeader, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Mock from 'mockjs'

const namespace = "list"

export interface ListProps<M> {
  actions: IAction;
  reducer: IReducerState;
  items: M[];
  item: M;
}

type IPList = ListProps<IModel>


function locale(str: string) {
  return str
}

// function handlerMenu(rowkeys: PK | PK[], actionType: string) {
//   // const actions = useActions()
//   if (actionType === 'add') {
//     //   this.goAdd();
//   } else if (actionType === 'edit') {
//     //   this.goEdit(rowkeys as PK);
//   } else if (actionType === 'detail') {
//     //   this.goDetail(rowkeys as PK);
//   } else if (actionType === 'delete') {
//     // actions.fetchDelete(owkeys)
//   }
// }


// const SearchForm: FC<IPList> = function (props: IPList) {

//     const query: IParams<any> = useQuery();
//     const actions = useActions<IAction>(Action,namespace)
//     return (
//         <HeadSearchBar
//             showSearchButton={false}
//             filterSubmitHandler={(value) =>actions.fetchPage(value)}>
//         <FormItem name='key'>
//           <Input defaultValue={""} placeholder="请输入关键字"/>
//         </FormItem>
//         <FormItem name='dept' options={[{label:"部门一",value:"1"}]}>
//           <Select placeholder="请选择部门" />
//         </FormItem>
//         </HeadSearchBar>
//     );
// }

const Toolbar: FC<IPList> = function (props: IPList) {
  // const {selectedRows,selectedRowKeys} = useRowSelection()
  const { t } = useTranslation();
  //@ts-ignore
  const {selectedRowKeys} = props
  // console.log("selectRows",selectedRowKeys)
  return (
    <Space>
      <Button icon={<EditOutlined />} disabled={selectedRowKeys.length === 0} >
        {t('GLOBAL.EDIT')}
      </Button>
      <Button icon={<DeleteOutlined />}  disabled={selectedRowKeys.length === 0} danger>
        {t('GLOBAL.REMOVE')}
      </Button>
      <span>selected {selectedRowKeys.length} rows! </span>
    </Space>
  );
}

// const tableOpt: FC<IPList> = function (props: IPList) {
//     return (
//         <ButtonGroups
//             handleClick={(actionType: string) => 
//                 handlerMenu("1", actionType)
//             }>
//             <Button actionkey='edit'>{locale('GLOBAL.MODIFY')}</Button>
//             <Button actionkey='detail'>{locale('GLOBAL.DETAIL')}</Button>
//             <Button actionkey='delete'>{locale('GLOBAL.REMOVE')}</Button>
//         </ButtonGroups>
//     );
// }

const useRowSelection = function(){
  const [selectedRows,setSelectedRows] = useState([])
  const [selectedRowKeys,setSelectedRowKeys] = useState([])

  return {selectedRows,selectedRowKeys,setSelectedRows,setSelectedRowKeys}
}

const Datatable: FC<IPList> = function (props: IPList) {
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
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: 'options',
        dataIndex: 'options',
        width: 190,
        // render: tableOpt
      }
    ]
  };
  
  const {selectedRows,selectedRowKeys,setSelectedRows,setSelectedRowKeys} = useRowSelection()
  const rowSelection = {
    onChange: (selectRowKeys: any, selectRows:any)=>{
      console.log(`selectRowKeys: ${selectRowKeys}`, 'selectRows: ', selectRows);
      //@ts-ignore
      setSelectedRows(selectRows)
      setSelectedRowKeys(selectRowKeys)
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
    selectedRowKeys={selectedRowKeys}></Toolbar>
    }
    <Table
      rowSelection={rowSelection}
      {...tableConf}
      rowKey='id'
      size="small"
    />
    </>
  );
}

const useActions = function <T extends IAction>(Action: InjectFactory.Constructor<T>, namespace: string) {
  const dispatch = useDispatch()
  const actions = InjectFactory.ActionFactory(Action, dispatch, namespace)
  return actions
}

const ListView: FC<IPList> = function (props: IPList) {
  const params = { a: 1 }
  const action = useActions<IAction>(Action, namespace)
  // const {appReducer,item,items,fetchingReducer,reducer} = useSelector(containerSelector(namespace,{id:1}))
  // const queryReducer = useSelector(querysSelector)
  // const spinsReducer = useSelector(spinsSelector)    
  // const appReducer = useSelector(appSelector)
  const ormReducer = useSelector(ormSelector)
  // console.log(appReducer,item,items,fetchingReducer,reducer)
  // console.log(queryReducer,spinsReducer,ormReducer)

  useEffect(function () {
    action.fetchPage(params)
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
        <Button type="primary">添加新数据源</Button>
      }
    >
      {/* <SearchForm {...props} ></SearchForm> */}
      <Datatable {...props} items = {data.data} ></Datatable>
    </PageHeader>
  );
}

export { useActions }

export default ListView

