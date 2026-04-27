/** Calendar year from which “years of experience” is counted (increases each Jan 1). */
export const RUBIN_CAREER_START_YEAR = 2016;

export function rubinYearsOfExperience(now: Date = new Date()): number {
  return Math.max(0, now.getFullYear() - RUBIN_CAREER_START_YEAR);
}
