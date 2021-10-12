import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './index.css';
const DLayout = {
    className: '',
    direction: 'row',
    children: null
};
export function RFLayout(props = DLayout) {
    return (_jsx("div", Object.assign({ className: ['flex-layout', props.className].join(' '), style: { ...props.style, flexDirection: props.direction } }, { children: props.children }), void 0));
}
export function RFPane(props) {
    function renderCollapse(props) {
        if (props.collaplse) {
            return _jsx("div", Object.assign({ className: ['flex-layout', 'collapse'].join('-') }, { children: ">" }), void 0);
        }
    }
    return (_jsxs("div", Object.assign({ className: ['flex-pane', props.className].join(' '), style: props.style }, { children: [renderCollapse(props), props.children] }), void 0));
}
export function RFFixed(props) {
    _jsx("div", Object.assign({ className: ['flex-pane', props.className].join(' ') }, { children: props.children }), void 0);
}
