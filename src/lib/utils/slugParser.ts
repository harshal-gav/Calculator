/**
 * Parses a slug like "10000-5-years" and extracts parameters.
 * Assumes format: {amount}-{duration}-years
 */
export function parseSipSlug(slug: string): { amount: number; duration: number } | null {
  const parts = slug.toLowerCase().split('-');
  
  // Basic validation that we got at least 3 parts (e.g. ['10000', '5', 'years'])
  if (parts.length < 3) return null;

  // The last part is "years", second to last is duration
  const yearIndex = parts.indexOf('years');
  const monthIndex = parts.indexOf('months');
  
  if (yearIndex === -1 && monthIndex === -1) return null;
  
  const isYears = yearIndex !== -1;
  const timeStr = isYears ? parts[yearIndex - 1] : parts[monthIndex - 1];
  
  const duration = parseInt(timeStr, 10);
  
  // The amount is the rest of the slug before the duration
  // For "10000-5-years", amount part is "10000"
  const amountStr = parts.slice(0, (isYears ? yearIndex : monthIndex) - 1).join('');
  const amount = parseInt(amountStr, 10);

  if (isNaN(amount) || isNaN(duration) || amount <= 0 || duration <= 0) {
    return null;
  }

  // Always return internal duration as years conceptually, unless tracking months specifically.
  // For simplicity keeping duration as exactly what was passed.
  return { amount, duration: isYears ? duration : duration / 12 };
}
