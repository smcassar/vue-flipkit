import { FlippedProps } from 'flip-toolkit/lib/types'

export type AddFlippedConfig = FlippedProps & { element: HTMLElement }

export type AddInvertedConfig = {
  element: HTMLElement
  parent: HTMLElement
  opacity: boolean
  translate: boolean
  scale: boolean
  transformOrigin: string
}

export type addFlipped = (config: AddFlippedConfig) => void
export type addInverted = (config: AddInvertedConfig) => void
