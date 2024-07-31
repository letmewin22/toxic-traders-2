export const truncateStringsArray = (strings: string[], maxLength: number) => {
  return strings.map(str => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...'
    } else {
      return str
    }
  })
}
