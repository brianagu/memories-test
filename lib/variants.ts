/**
 * Media block layout variants
 * All measurements in pixels, based on 1320px content column width
 */

export type VariantName = 'S-left' | 'S-right' | 'S-center' | 'M-left' | 'M-right' | 'M-center' | 'L-center' | 'full';

export interface VariantConfig {
  name: VariantName;
  mediaAspect: string;
  gridColumn: string; // CSS grid placement: e.g. "2 / 6" means columns 2-5
}

export const VARIANTS: Record<VariantName, VariantConfig> = {
  'S-left': {
    name: 'S-left',
    mediaAspect: 'aspect-[386/232]',
    gridColumn: '2 / 6',
  },
  'S-right': {
    name: 'S-right',
    mediaAspect: 'aspect-[386/232]',
    gridColumn: '8 / 12',
  },
  'S-center': {
    name: 'S-center',
    mediaAspect: 'aspect-[386/232]',
    gridColumn: '5 / 9',
  },
  'M-left': {
    name: 'M-left',
    mediaAspect: 'aspect-[853/512]',
    gridColumn: '1 / 9',
  },
  'M-right': {
    name: 'M-right',
    mediaAspect: 'aspect-[853/512]',
    gridColumn: '5 / 13',
  },
  'M-center': {
    name: 'M-center',
    mediaAspect: 'aspect-[853/512]',
    gridColumn: '3 / 11',
  },
  'L-center': {
    name: 'L-center',
    mediaAspect: 'aspect-[1086/651]',
    gridColumn: '2 / 12',
  },
  'full': {
    name: 'full',
    mediaAspect: 'aspect-[1320/792]',
    gridColumn: '1 / 13',
  },
};

export const VARIANT_NAMES: VariantName[] = [
  'S-left',
  'S-right',
  'S-center',
  'M-left',
  'M-right',
  'M-center',
  'L-center',
  'full',
];
