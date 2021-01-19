import { FlippedProps } from 'flip-toolkit/lib/types';
export declare type AddFlippedConfig = FlippedProps & {
    element: HTMLElement;
};
export declare type AddInvertedConfig = {
    element: HTMLElement;
    parent: HTMLElement;
    opacity: boolean;
    translate: boolean;
    scale: boolean;
    transformOrigin: string;
};
export declare type addFlipped = (config: AddFlippedConfig) => void;
export declare type addInverted = (config: AddInvertedConfig) => void;
