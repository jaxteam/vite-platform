class MicroRender {
    renderEngine = {};
    registerRender(name, render, distory) {
        this.renderEngine[name] = render;
    }
    getRender(name) {
        return this.renderEngine[name];
    }
}
const microRender = new MicroRender();
// render html string 
microRender.registerRender('html', function (component, element) {
    element.innerHTML = component;
    return element;
});
// redner html dom
microRender.registerRender('dom', function (component, element) {
    element.appendChild(component);
    return element;
});
export default microRender;
