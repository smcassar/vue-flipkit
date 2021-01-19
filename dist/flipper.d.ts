import { Flipper } from 'flip-toolkit';
import { StaggerConfig } from 'flip-toolkit/lib/types';
import { PropType, Ref } from 'vue';
export declare function useFlipper(el: HTMLElement | Ref<HTMLElement>, flipKey: any, config: object, cb?: (instance: Flipper) => void): {
    isReady: Ref<boolean>;
};
declare const _default: import("vue").DefineComponent<{
    flipKey: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
        required: true;
    };
    spring: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    stagger: {
        type: PropType<StaggerConfig>;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, any[], any, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    flipKey: string | number | boolean;
    spring: string;
    stagger: StaggerConfig;
} & {}>, {
    spring: string;
    stagger: StaggerConfig;
}>;
export default _default;
