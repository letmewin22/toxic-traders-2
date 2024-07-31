export const getGMTOffset = (minutes: number): string => {
  if (!minutes) return 'N/A'
  const sign = minutes >= 0 ? '+' : '-'
  const hours = Math.abs(minutes) / 60

  return `GMT${sign}${hours}`
}
