import { raf } from '~/utils/ea'

export default class NavbarPos {
  scrollPos = 0
  mouseFunc: (e: MouseEvent) => void
  top = 0

  $sc = document.querySelector('#scroll-container')
  hovered = false

  constructor() {
    this.mouseFunc = e => {
      this.mouseHandler(e)
    }
  }

  init() {
    this.scrollPos = 0
    this.scrollNav = this.scrollNav.bind(this)
    raf.on(this.scrollNav)
  }

  mouseHandler(e) {
    if (e.screenY <= 300) {
      document.body.classList.remove('nav-hidden')
      this.hovered = true
    } else {
      this.hovered = false
      document.body.classList.add('nav-hidden')
    }
  }

  scrollNav() {
    this.top = -this.$sc.scrollTop

    if (this.hovered) {
      return
    }

    this.isVisible && this.addVisibility()

    this.isHidden && this.removeVisibility()

    this.scrollPos = -this.$sc.scrollTop
  }

  get isHidden() {
    return this.top < this.scrollPos && this.scrollPos < 0 && -this.top >= 0
  }

  get isVisible() {
    return this.top > this.scrollPos || this.isFixed
  }

  get isFixed() {
    return window.escroll ? window.escroll.disabled : false
  }

  addVisibility() {
    document.body.classList.remove('nav-hidden')
    document.removeEventListener('mousemove', this.mouseFunc)
  }

  removeVisibility() {
    document.body.classList.add('nav-hidden')
    document.addEventListener('mousemove', this.mouseFunc)
  }

  destroy() {
    this.scrollPos = 0
    raf.off(this.scrollNav)
  }
}
