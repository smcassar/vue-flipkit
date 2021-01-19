import { defineComponent, ref, h, inject, onMounted, isRef, toRefs, onBeforeUpdate, watch, nextTick, provide } from 'vue';
import { Flipper } from 'flip-toolkit';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function useFlipped(el, _a, emit) {
    var flipId = _a.flipId, inverse = _a.inverse, options = _a.options;
    var registerFn = inject(inverse ? 'addInverted' : 'addFlipped');
    if (!flipId && !inverse) {
        console.error('Flipped requires [flipId] when not inversed');
    }
    var emitters = {
        onStart: function (el) { return emit && emit('start', { el: el, id: flipId }); },
        onComplete: function (el) { return emit && emit('complete', { el: el, id: flipId }); }
    };
    onMounted(function () {
        var element = isRef(el) ? el.value : el;
        registerFn && registerFn(__assign(__assign({ element: element, parent: element.parentNode, flipId: flipId }, (inverse ? {} : emitters)), options));
    });
}
var flipped = defineComponent({
    name: 'Flipped',
    emits: ['start', 'complete'],
    props: {
        flipId: { type: String },
        inverse: { type: Boolean, default: false },
        opacity: { type: Boolean, default: false },
        scale: { type: Boolean, default: false },
        translate: { type: Boolean, default: false }
    },
    setup: function (props, _a) {
        var attrs = _a.attrs, emit = _a.emit, slots = _a.slots;
        var $el = ref();
        useFlipped($el, {
            flipId: props.flipId,
            inverse: props.inverse,
            options: __assign({ opacity: props.opacity, scale: props.scale, translate: props.translate }, attrs)
        }, emit);
        return function () { return h('div', { ref: $el }, slots.default ? slots.default() : []); };
    }
});

function useFlipper(el, flipKey, config, cb) {
    var flipInstance;
    var isReady = ref(false);
    onMounted(function () {
        flipInstance = new Flipper(__assign({ element: isRef(el) ? el.value : el }, config));
        isReady.value = true;
        cb && cb(flipInstance);
    });
    onBeforeUpdate(function () { return flipInstance.recordBeforeUpdate(); });
    watch(flipKey, function (newKey, prevKey) {
        if (newKey !== prevKey) {
            nextTick(function () { return flipInstance.update(prevKey, newKey); });
        }
    });
    // @ts-ignore
    watch(function () { return config.staggerConfig; }, function (newConfig, oldConfig) { return (newConfig !== oldConfig) && (flipInstance.staggerConfig = newConfig); });
    var addFlipped = function (config) { return flipInstance.addFlipped(config); };
    var addInverted = function (config) { return nextTick(function () { return flipInstance.addInverted(config); }); };
    provide('addFlipped', addFlipped);
    provide('addInverted', addInverted);
    return { isReady: isReady };
}
var flipper = defineComponent({
    name: 'Flipper',
    emits: [],
    props: {
        flipKey: { type: [String, Number, Boolean], required: true },
        spring: { type: [String, Object], default: 'noWobble' },
        stagger: { type: Object, default: function () { return ({}); } }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        var $el = ref();
        var _b = toRefs(props), flipKey = _b.flipKey, spring = _b.spring, stagger = _b.stagger;
        var isReady = useFlipper($el, flipKey, { spring: spring, staggerConfig: stagger }).isReady;
        return function () { return h('div', { ref: $el }, isReady.value && slots.default ? slots.default() : []); };
    }
});

export { flipped as Flipped, flipper as Flipper, useFlipped, useFlipper };
