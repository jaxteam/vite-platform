import UniversalRouter, { Route, RouteParams, RouterContext, Routes } from "universal-router";
import generateUrls from 'universal-router/generateUrls'
import {Update,History } from "history"

export type RenderEngine = (component:any, element: HTMLElement)=>HTMLElement

export interface  MicroRoute<R = Route, C extends RouterContext = RouterContext> extends Route{
    component?:(context:MicroContext,params:any)=>any
    mount?:()=>void
    umount?:()=>void
    engine?:RenderEngine
    children?: any;
}

export interface MicroContext extends RouterContext{
    
}

export type MicroRoutes<R = any, C extends RouterContext = MicroContext> = Array<MicroRoute<R, C>>

export interface MicroAppOptions{
    history:History;
    routes:MicroRoutes;
    // element:HTMLElement
}

interface MicroMiddleware{
    init:(instance:MicroApp)=>void
}


class MicroApp{
    private history:History;
    private router:UniversalRouter;
    constructor(options:MicroAppOptions){
        this.history = options.history
        this.router = this.initRouter(options)
    }
    /**
     * 获始化 UniversalRouter 对象
     * @param options 
     * @returns UniversalRouter 
     */
    initRouter(options:MicroAppOptions){
        const universalConfig = {
            action: async function (context: RouterContext) {
                console.log('middleware: start',context)
                const child = await context.next()
                console.log('middleware: end')
                return child
                
                // return 
            },
            resolveRoute: function (context: RouterContext, params: RouteParams) {
                if ((context.route?.preAction && context.route?.preAction(context, params) || context.route?.preAction === undefined) && typeof context.route.component === 'function') {
                    const shadowHost = document.createElement("div")
                    // TODO: 使用 shadow dom 造成 React Event 无法响应
                    // const shadowRoot = shadowHost.attachShadow({mode:"open"})
                    // console.log(context)
                    return context.route.engine(context.route.component(context, params)(context, params), shadowHost)
                }
                return undefined
            }
        }
        return new UniversalRouter(options.routes, {
            resolveRoute: universalConfig.resolveRoute
        })  
    }
    /**
     * use middleware
     * @param middleware
     */
    use(middleware:MicroMiddleware){
        middleware.init(this);
    }
    /**
     * 添加子路由配置
     * @param router MicroRoute 对象
     */

    addView(router:MicroRoute){
        this.router.root.children?.push(router)
    }

    getRoutes(){
        return this.router.root
    }
    push(pathname:string){
        this.history.push(pathname)
    }

    getHistory(){
        return this.history
    }
    /**
     * 查找指定route URL完整地址
     * @param name route 指定名称
     * @param params route 路由param 参数，用于格式化 route 变量名称 
     * @returns 
     */
    findURL(name:string,params?:any){
        // this.history.location
        return generateUrls(this.router)(name,params)
    }

    /**
     * 渲染组件
     * @param dom 挂载节点
     * @returns 
     */
    render(dom:HTMLElement):MicroApp{
        var self = this
        self.history.listen(function (update: Update) {
            // console.log(update)
            self.router.resolve(update.location.pathname).then(component => {
                // console.log(component)
                dom.innerHTML=""
                dom.appendChild(component)
                // console.log(dom.innerHTML,component)
            })
        }) 
        return self 
    }

}

export default MicroApp
