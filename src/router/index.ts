import { Engine } from '@btc/micro'
import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { MicroContext, MicroRoute, MicroRoutes } from '@btc/micro/lib/micro'
import Dashboard from '../views/dashboard'
import ListView from '../views/list'
import EditView from '../views/edit'
import DetailView from '../views/detail'
import { Provider } from 'react-redux'
import storeManager from '../store'


Engine.registerRender('react', function (component: JSX.Element, element: HTMLElement) {
    const view = createElement(Provider, { store: storeManager.getStore() }, component)
    ReactDOM.render(view, element)
    return element
})

export const routes: MicroRoutes<MicroRoute, MicroContext> = [{
    path: '/',
    component: (context: MicroContext, props: any) => () => {
        return createElement("div", {}, "dashboard")
    },
    engine: Engine.getRender('react')
}, {
    path: '/dashboard',
    name: "dashboard",
    component: (context: MicroContext, props: any) => () => {
        return createElement(Dashboard)
    },
    engine: Engine.getRender('react')
}, {
    // path: '/list',
    // name: "demo.list",
    // // component: (context: MicroContext, props: any) => () => {
    // //     context.next()
    // //     // return 
    // // }, 
    // children: [{
        path: '/list',
        name: "demo.list",
        component: (context: MicroContext, props: any) => () => {
            return createElement(ListView)
        }, 
        engine: Engine.getRender('react')
    }, {
        path: '/detail',
        name: "demo.detail",
        component: (context: MicroContext, props: any) => () => {
            return createElement(DetailView)
        },
        engine: Engine.getRender('react')
    // }],
}, {
    path: '/edit',
    name: "demo.edit",
    component: (context: MicroContext, props: any) => () => {
        return createElement(EditView)
    },
    engine: Engine.getRender('react')
    // },{
    //     path: '/list/detail',
    //     name:"demo.detail",
    //     component: (context: MicroContext, props: any) => () => {
    //         return createElement(DetailView)
    //     },
    //     engine: Engine.getRender('react')
}]