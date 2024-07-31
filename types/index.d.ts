import EmotionScroll from '@emotionagency/emotion-scroll'

export {}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    escroll: typeof EmotionScroll.prototype
  }
}
