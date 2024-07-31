import type { iBroker } from '~/types/broker/broker'

export const formatNameToNormalCase = (name: string) => {
  const format = name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\d+([a-zA-Z]+)/g, match =>
      match.replace(/(\d+)([a-zA-Z]+)/, '$1 $2')
    )
    .replace(
      /([a-zA-Z])+/g,
      match => match.charAt(0).toUpperCase() + match.slice(1)
    )

  return format
}

export const formatToSnakeCase = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\d+([a-zA-Z]+)/g, match =>
      match.replace(/(\d+)([a-zA-Z]+)/, '$1_$2')
    )
    .toLowerCase()
}

export const getBrokerHeadings = (names: iBroker) => {
  return Object.keys(names)
}
