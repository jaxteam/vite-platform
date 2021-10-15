import UniversalRouter from "universal-router";
import generateUrls from 'universal-router/generateUrls';
class MicroApp {
    history;
    router;
    constructor(options) {
        this.history = options.history;
        this.router = this.initRouter(options);
    }
    /**
     * 获始化 UniversalRouter 对象
     * @param options
     * @returns UniversalRouter
     */
    initRouter(options) {
        const universalConfig = {
            action: async function (context) {
                console.log('middleware: start', context);
                const child = await context.next();
                console.log('middleware: end');
                return child;
                // return 
            },
            resolveRoute: function (context, params) {
                if ((context.route?.preAction && context.route?.preAction(context, params) || context.route?.preAction === undefined) && typeof context.route.component === 'function') {
                    const shadowHost = document.createElement("div");
                    // TODO: 使用 shadow dom 造成 React Event 无法响应
                    // const shadowRoot = shadowHost.attachShadow({mode:"open"})
                    // console.log(context)
                    return context.route.engine(context.route.component(context, params)(context, params), shadowHost);
                }
                return undefined;
            }
        };
        return new UniversalRouter(options.routes, {
            resolveRoute: universalConfig.resolveRoute
        });
    }
    /**
     * use middleware
     * @param middleware
     */
    use(middleware) {
        middleware.init(this);
    }
    /**
     * 添加子路由配置
     * @param router MicroRoute 对象
     */
    addView(router) {
        this.router.root.children?.push(router);
    }
    getRoutes() {
        return this.router.root;
    }
    push(pathname) {
        this.history.push(pathname);
    }
    getHistory() {
        return this.history;
    }
    /**
     * 查找指定route URL完整地址
     * @param name route 指定名称
     * @param params route 路由param 参数，用于格式化 route 变量名称
     * @returns
     */
    findURL(name, params) {
        // this.history.location
        return generateUrls(this.router)(name, params);
    }
    /**
     * 渲染组件
     * @param dom 挂载节点
     * @returns
     */
    render(dom) {
        var self = this;
        self.history.listen(function (update) {
            // console.log(update)
            self.router.resolve(update.location.pathname).then(component => {
                // console.log(component)
                dom.innerHTML = "";
                dom.appendChild(component);
                // console.log(dom.innerHTML,component)
            });
        });
        return self;
    }
}
export default MicroApp;
