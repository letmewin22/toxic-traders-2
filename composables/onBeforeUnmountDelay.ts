import { delayPromise } from '~/utils/ea'

type TFunc = (...args: any) => any

export const useOnBeforeUnmountDelay = (cb: TFunc, delay = 2000) => {
  onBeforeUnmount(async () => {
    await delayPromise(delay)
    cb()
  })
}
