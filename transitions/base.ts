import type { TransitionProps } from 'vue'
import gsap from 'gsap'

export const pageTransition: TransitionProps = {
  duration: 250,
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(el, done) {
    gsap.fromTo(
      el,
      { opacity: 0 },
      { duration: 0.25, opacity: 1, delay: 0.25, onComplete: done }
    )
  },
  onLeave(el, done) {
    gsap.fromTo(
      el,
      { opacity: 1 },
      { duration: 0.25, opacity: 0, onComplete: done }
    )
  },
}
