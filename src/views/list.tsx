import React, { FC, useEffect, useState } from 'react'
// import {
//     Panel
// } from '@mcfed/components';
import { IAction, IReducerState, IModel,PK, IParams } from './interface';
import Table, { TableProps } from 'antd/lib/table';
import { appSelector, containerSelector, querys, querysSelector, spinsSelector } from '@mcfed/core/dist/selector';
import { InjectFactory } from '@mcfed/core';
// import Action from '../action';
import { useDispatch,useSelector } from 'react-redux';
// import { namespace } from '../model';
import { ormSelector, reducerListSelector, reducerModel } from '@mcfed/core/dist/selector/reducerSelector';
import Action from './actions';

const namespace="list"

export interface ListProps<M>  {
    actions: IAction;
    reducer: IReducerState;
    items: M[];
    item: M;
}

type IPList = ListProps<IModel>


function locale(str:string){
    return str
}

function useQuery(): IParams<any> {
   const query  = useSelector(querysSelector)
    // const query={}
   return query
}



function handlerMenu(rowkeys: PK | PK[], actionType: string){
    // const actions = useActions()
    if (actionType === 'add') {
    //   this.goAdd();
    } else if (actionType === 'edit') {
    //   this.goEdit(rowkeys as PK);
    } else if (actionType === 'detail') {
    //   this.goDetail(rowkeys as PK);
    } else if (actionType === 'delete') {
        // actions.fetchDelete(owkeys)
    }
}


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

// const Toolbar: FC<IPList> = function (props: IPList) {
//      const [selectedRowKeys,setSelectedRowKeys] = useState([])
//     return (
//         <ButtonGroups
//             handleClick={(actionType: string) => 
//                 handlerMenu(selectedRowKeys, actionType)
//             }>
//             <Button actionkey='add' type='primary'>
//                 {locale('GLOBAL.NEW')}
//             </Button>
//             <Button actionkey='edit' disabled={selectedRowKeys.length===0} >
//           {locale('GLOBAL.EDIT')}
//         </Button>
//             <Button actionkey='delete' loading={true}>
//                 {locale('GLOBAL.REMOVE')}
//             </Button>
//         </ButtonGroups>
//     );
// }

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

const Datatable: FC<IPList> = function (props: IPList) {

    // const {appReducer,item,items,fetchingReducer,reducer} = useSelector(containerSelector(namespace,{id:1}))
    let tableConf: TableProps<any> = {
        rowKey: 'userId',
        dataSource: [],
        columns: [
            {
                title: "dept",
                key:'dept',
                dataIndex:'dept',
                width:180
              },
              {
                title: "email",
                key:'email',
                dataIndex:'email',
                width:180
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

    return (
        <Table
            // rowSelection={null}
            // page={reducer}
            {...tableConf}
            rowKey= 'userId'
            // dataSource= {items}
        />
    );
}

const useActions = function<T extends IAction>(Action:InjectFactory.Constructor<T>,namespace:string){
    const dispatch = useDispatch()
    const actions = InjectFactory.ActionFactory(Action, dispatch, namespace)
    return actions
}

const ListView: FC<IPList> = function (props: IPList) {
    const params = {a:1}
    const action = useActions<IAction>(Action,namespace)
    // const {appReducer,item,items,fetchingReducer,reducer} = useSelector(containerSelector(namespace,{id:1}))
    // const queryReducer = useSelector(querysSelector)
    // const spinsReducer = useSelector(spinsSelector)    
    // const appReducer = useSelector(appSelector)
    const ormReducer = useSelector(ormSelector)
    // console.log(appReducer,item,items,fetchingReducer,reducer)
    // console.log(queryReducer,spinsReducer,ormReducer)

    useEffect(function(){
        action.fetchPage(params)
    },[1])
   
    return (
        <div >
            {/* <SearchForm {...props} ></SearchForm>
            <Toolbar {...props}  ></Toolbar> */}
            <Datatable {...props}></Datatable>
        </div>
    );
}

export {useActions}

export default ListView


