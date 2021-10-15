import { InjectFactory } from "@mcfed/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { IAction } from "../views/interface"

const useRowSelection = function (name: string) {
    const [selectedRows, setSelectedRows] = useState([])
    // const [selectedRowKeys,setSelectedRowKeys] = useState([])
    function clearSelectRows() {
        setSelectedRows([])
    }


    return [selectedRows, setSelectedRows, clearSelectRows]
}

// TODO: 反复创建实例多次开销
const useActions = function <T extends IAction>(Action: InjectFactory.Constructor<T>, namespace: string) {
    const dispatch = useDispatch()
    let actions;
    // useEffect(function(){
    actions = InjectFactory.ActionFactory(Action, dispatch, namespace)
    // },[Action])

    return [actions]
}

export { useActions, useRowSelection }