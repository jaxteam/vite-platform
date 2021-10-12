export declare type RenderEngine = (component: any, element: HTMLElement) => HTMLElement;
declare class MicroRender {
    private renderEngine;
    registerRender(name: string, render: RenderEngine, distory?: () => void): void;
    getRender(name: string): any;
}
declare const microRender: MicroRender;
export default microRender;
