import React, { CSSProperties, ReactNode } from 'react';
import './index.css';

export interface PLayout {
    className?: string;
    direction?: 'column' | 'row';
    children: ReactNode;
    style?: CSSProperties;
}
const DLayout: PLayout = {
    className: '',
    direction: 'row',
    children: null
};

export function RFLayout(props: PLayout = DLayout) {
    return (
        <div
            className={['flex-layout', props.className].join(' ')}
            style={{ ...props.style, flexDirection: props.direction }}>
            {props.children}
        </div>
    );
}


export function ResizeEdge(){
    return <div className="resize-edge resize-edge-bottom"></div>
}

export interface PPane {
    className?: string;
    children: ReactNode;
    collaplse?: Boolean;
    resize?:Boolean;
    style?: CSSProperties;
    direction?: 'left' | 'right' | 'top' | 'bottom';
}

export function RFPane(props: PPane) {
    function renderCollapse(props: PPane) {
        if (props.collaplse) {
            return <div className={['flex-layout', 'collapse'].join('-')}>&gt;</div>;
        }
    }
    return (
        <div
            className={['flex-pane', props.className].join(' ')}
            style={props.style}>
            {renderCollapse(props)}
            {props.children}
            {props.resize && <ResizeEdge></ResizeEdge>}
        </div>
    );
}

export interface PFixed {
    className?: string;
    children: ReactNode;
}

export function RFFixed(props: PFixed) {
    return (
        <div
        className={['flex-fixed', props.className].join(' ')} >
            {props.children}
        </div>
    )
}
