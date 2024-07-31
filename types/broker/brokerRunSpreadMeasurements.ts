export interface iBrokerRunSpreadMeasurements {
  symbolId: number
  serverType: number
  symbolName: string
  timeLengthSec: number
  startDateTime: string
  SpreadOrNewsSpread: number
}

export interface iBrokerRunSpreadMeasurementsData {
  data: {
    symbolId: number
    serverType: number
    symbolName: string
    timeLengthSec: number
    startDateTime: string
    SpreadOrNewsSpread: number
  }
}
