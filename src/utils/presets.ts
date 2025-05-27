import PLACEHOLDER_IMAGE_URL from '@/assets/logo.png'
import PlainConfig from '@/assets/presets/plain.json'
import type { DrawType, Options as StyledQRCodeProps } from 'qr-code-styling'

export interface CustomStyleProps {
  borderRadius?: string
  background?: string
}

export type PresetAttributes = {
  style: CustomStyleProps
  name: string
}

export type Preset = Omit<
  Required<StyledQRCodeProps>,
  'shape' | 'qrOptions' | 'nodeCanvas' | 'jsdom'
> &
  PresetAttributes

const defaultPresetOptions = {
  backgroundOptions: {
    color: 'transparent'
  },
  imageOptions: {
    margin: 0
  },
  width: 200,
  height: 200,
  margin: 0,
  type: 'svg' as DrawType
}

// Individual presets

export const defaultPreset: Preset = {
  ...PlainConfig,
  name: 'Prégérance',
  image: PLACEHOLDER_IMAGE_URL,
  ...defaultPresetOptions,
}

export const allPresets: Preset[] = [defaultPreset]
