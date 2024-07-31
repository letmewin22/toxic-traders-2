export const formatNumber = (num: number): string => {
  if (!num) return
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}