import { CSSProperties, ReactNode } from 'react';
import './index.css';
export interface PLayout {
    className?: string;
    direction?: 'column' | 'row';
    children: ReactNode;
    style?: CSSProperties;
}
export declare function RFLayout(props?: PLayout): JSX.Element;
export interface PPane {
    className?: string;
    children: ReactNode;
    collaplse?: Boolean;
    style?: CSSProperties;
    direction?: 'left' | 'right' | 'top' | 'bottom';
}
export declare function RFPane(props: PPane): JSX.Element;
export interface PFixed {
    className?: string;
    children: ReactNode;
}
export declare function RFFixed(props: PFixed): void;
