import { Engine } from '@btc/micro'
import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { MicroContext, MicroRoutes } from '@btc/micro/lib/micro'
import Dashboard from '../views/dashboard'
import ListView from '../views/list'
import EditView from '../views/edit'
import { Provider } from 'react-redux'
import storeManager from '../store'


Engine.registerRender('react', function (component: JSX.Element, element: HTMLElement) {
    const view = createElement(Provider,{store:storeManager.getStore()},component)
    ReactDOM.render(view, element)
    return element
})

export const routes: MicroRoutes<any, MicroContext> = [{
    path: '/',
    component: (context: MicroContext, props: any) => () => {
        return createElement("div", {}, "dashboard")
    },
    engine: Engine.getRender('react')
},{
    path: '/dashboard',
    name:"dashboard",
    component: (context: MicroContext, props: any) => () => {
        return createElement(Dashboard)
    },
    engine: Engine.getRender('react')
},{
    path: '/list',
    name:"list",
    component: (context: MicroContext, props: any) => () => {
        return createElement(ListView)
    },
    engine: Engine.getRender('react')
},{
    path: '/edit',
    name:"edit",
    component: (context: MicroContext, props: any) => () => {
        return createElement(EditView)
    },
    engine: Engine.getRender('react')
}]