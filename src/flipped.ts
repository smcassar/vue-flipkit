import { defineComponent, h, inject, isRef, onMounted, Ref, ref } from 'vue'

export function useFlipped (el: HTMLElement | Ref<HTMLElement>, { flipId, inverse, options }: { flipId?: string, inverse?: boolean, options?: object }, emit?: any) {
  const registerFn = inject<(config: any) => void>(inverse ? 'addInverted' : 'addFlipped')

  if (!flipId && !inverse) {
    console.error('Flipped requires [flipId] when not inversed')
  }

  const emitters = {
    onStart: (el: HTMLElement) => emit && emit('start', { el, id: flipId }),
    onComplete: (el: HTMLElement) => emit && emit('complete', { el, id: flipId })
  }

  onMounted(() => {
    let element = isRef(el) ? el.value : el
    registerFn && registerFn({
      element,
      parent: element.parentNode,
      flipId,
      ...(inverse ? {} : emitters),
      ...options
    })
  })
}

export default defineComponent({
  name: 'Flipped',
  emits: ['start', 'complete'],
  props: {
    flipId: { type: String },
    inverse: { type: Boolean, default: false },
    opacity: { type: Boolean, default: false },
    scale: { type: Boolean, default: false },
    translate: { type: Boolean, default: false }
  },
  setup (props, { attrs, emit, slots }) {
    const $el = ref<HTMLElement>()

    useFlipped($el as Ref, {
      flipId: props.flipId,
      inverse: props.inverse,
      options: {
        opacity: props.opacity,
        scale: props.scale,
        translate: props.translate,
        ...attrs
      }
    }, emit)

    return () => h('div', { ref: $el }, slots.default ? slots.default() : [])
  }
})
