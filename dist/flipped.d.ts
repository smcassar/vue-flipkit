import { Ref } from 'vue';
export declare function useFlipped(el: HTMLElement | Ref<HTMLElement>, { flipId, inverse, options }: {
    flipId?: string;
    inverse?: boolean;
    options?: object;
}, emit?: any): void;
declare const _default: import("vue").DefineComponent<{
    flipId: {
        type: StringConstructor;
    };
    inverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    opacity: {
        type: BooleanConstructor;
        default: boolean;
    };
    scale: {
        type: BooleanConstructor;
        default: boolean;
    };
    translate: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("start" | "complete")[], "start" | "complete", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    inverse: boolean;
    opacity: boolean;
    scale: boolean;
    translate: boolean;
} & {
    flipId?: string;
}>, {
    inverse: boolean;
    opacity: boolean;
    scale: boolean;
    translate: boolean;
}>;
export default _default;
