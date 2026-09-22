export interface ParsedScore {
  mean: number
  spread: number
  max: number
}

const SCORE = /^(?:about\s+)?(\d+(?:\.\d+)?)\s*±\s*(\d+(?:\.\d+)?)(?:\s+of\s+(\d+(?:\.\d+)?)|(%))?/

// Scores are stored as reported; this pulls out the numbers needed to draw them.
// bareMax is the scale for values with no "of N" or "%" (100 for a percent table,
// null when the scale is unknown, in which case there is nothing to draw against).
export function parseScore(value: string, bareMax: number | null): ParsedScore | null {
  const m = SCORE.exec(value)
  if (!m) return null
  const max = m[3] ? Number(m[3]) : m[4] ? 100 : bareMax
  if (max === null) return null
  return { mean: Number(m[1]), spread: Number(m[2]), max }
}
