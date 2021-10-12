import UniversalRouter, { Route, RouterContext } from "universal-router";
import { History } from "history";
export declare type RenderEngine = (component: any, element: HTMLElement) => HTMLElement;
export interface MicroRoute<R = any, C extends RouterContext = RouterContext> extends Route {
    component: (context: MicroContext, params: any) => any;
    mount?: () => void;
    umount?: () => void;
    engine: RenderEngine;
}
export interface MicroContext extends RouterContext {
}
export declare type MicroRoutes<R = any, C extends RouterContext = RouterContext> = Array<MicroRoute<R, C>>;
export interface MicroAppOptions {
    history: History;
    routes: MicroRoutes;
}
declare class MicroApp {
    private history;
    private router;
    constructor(options: MicroAppOptions);
    /**
     * 获始化 UniversalRouter 对象
     * @param options
     * @returns UniversalRouter
     */
    initRouter(options: MicroAppOptions): UniversalRouter<any, RouterContext>;
    /**
     * 添加子路由配置
     * @param router MicroRoute 对象
     */
    addView(router: MicroRoute): void;
    getRoutes(): Route<any, RouterContext>;
    push(pathname: string): void;
    /**
     * 查找指定route URL完整地址
     * @param name route 指定名称
     * @param params route 路由param 参数，用于格式化 route 变量名称
     * @returns
     */
    findURL(name: string, params?: any): string;
    /**
     * 渲染组件
     * @param dom 挂载节点
     * @returns
     */
    render(dom: HTMLElement): MicroApp;
}
export default MicroApp;
