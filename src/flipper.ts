import { Flipper } from 'flip-toolkit'
import { StaggerConfig } from 'flip-toolkit/lib/types'
import { defineComponent, h, isRef, nextTick, onBeforeUpdate, onMounted, PropType, provide, Ref, ref, toRefs, watch } from 'vue'
import { AddFlippedConfig, AddInvertedConfig } from './flipkit.interfaces'

export function useFlipper(el: HTMLElement | Ref<HTMLElement>, flipKey: any, config: object, cb?: (instance: Flipper) => void) {
  let flipInstance: Flipper
  const isReady = ref(false)

  onMounted(() => {
    flipInstance = new Flipper({ element: isRef(el) ? el.value : el, ...config })
    isReady.value = true
    cb && cb(flipInstance)
  })

  onBeforeUpdate(() => flipInstance.recordBeforeUpdate())

  watch(flipKey, (newKey, prevKey) => {
    if (newKey !== prevKey) {
      nextTick(() => flipInstance.update(prevKey, newKey))
    }
  })

  // @ts-ignore
  watch(() => config.staggerConfig, (newConfig, oldConfig) => (newConfig !== oldConfig) && (flipInstance.staggerConfig = newConfig))

  const addFlipped = (config: AddFlippedConfig) => flipInstance.addFlipped(config)
  const addInverted = (config: AddInvertedConfig) => nextTick(() => flipInstance.addInverted(config))

  provide('addFlipped', addFlipped)
  provide('addInverted', addInverted)

  return { isReady }
}

export default defineComponent({
  name: 'Flipper',
  emits: [],
  props: {
    flipKey: { type: [String, Number, Boolean], required: true },
    spring: { type: [String, Object], default: 'noWobble' },
    stagger: { type: Object as PropType<StaggerConfig>, default: () => ({}) }
  },
  setup (props, { slots }) {
    const $el = ref<HTMLElement>()
    const { flipKey, spring, stagger } = toRefs(props)

    const { isReady } = useFlipper(
      $el as Ref,
      flipKey,
      { spring, staggerConfig:stagger }
    )

    return () => h('div', { ref: $el }, isReady.value && slots.default ? slots.default() : [])
  }
})
