import { VARIANT_NAMES, VariantName } from './variants';
import type { MediaAsset } from './media';

export interface ShuffledAsset extends MediaAsset {
  variant: VariantName;
}

/**
 * Fisher-Yates shuffle an array in place
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pick a random variant that differs from the previous one
 * This ensures no two consecutive blocks use the same variant
 */
function pickVariant(previousVariant?: VariantName): VariantName {
  let variant: VariantName;
  let attempts = 0;
  const maxAttempts = 50; // safety valve

  do {
    variant = VARIANT_NAMES[Math.floor(Math.random() * VARIANT_NAMES.length)];
    attempts++;
  } while (variant === previousVariant && attempts < maxAttempts);

  return variant;
}

/**
 * Shuffle order and assign variants to each asset
 * Guarantees no two consecutive assets share the same variant
 */
export function shuffleAndAssignVariants(assets: MediaAsset[]): ShuffledAsset[] {
  if (assets.length === 0) {
    return [];
  }

  // First, shuffle the order
  const shuffled = fisherYatesShuffle(assets);

  // Then assign variants with adjacency check
  const result: ShuffledAsset[] = [];
  let previousVariant: VariantName | undefined;

  for (const asset of shuffled) {
    const variant = pickVariant(previousVariant);
    result.push({
      ...asset,
      variant,
    });
    previousVariant = variant;
  }

  return result;
}
