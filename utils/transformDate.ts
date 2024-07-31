interface iDateTimeParams {
  startDateTime: string
  seconds: number
  timezone: string
}

export const formatDate = (input: string): string => {
  const date = new Date(input)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDateWithTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const formatDateAmpm = (input: string): string => {
  const date = new Date(input)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12

  const formattedHours = String(hours).padStart(2, '0')

  return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`
}

export const formatDateToSeconds = (dateStr: string): number => {
  const date = new Date(dateStr)

  return Math.floor(date.getTime() / 1000)
}

export const getEndDateTime = ({
  startDateTime,
  seconds,
  timezone,
}: iDateTimeParams): string => {
  const startDate = new Date(startDateTime)
  const targetOffset = parseInt(timezone.split('GMT')[1]) * 60 * 60 * 1000
  const endDate = new Date(startDate.getTime() + seconds * 1000 - targetOffset)
  return endDate.toISOString()
}
