<script setup lang="ts">
import { resize } from '~/utils/ea'

// let navbarPos
const isDarkMode = ref(false)
const $el = ref<HTMLElement | null>(null)

const navigationList = [
  {
    text: 'Calendar',
    link: '/',
  },
  {
    text: 'Brokers',
    link: '/brokers',
  },
  {
    text: 'Spreads',
    link: '/spreads',
  },
]

const calcHeight = () => {
  const height = $el.value.offsetHeight
  document.documentElement.style.setProperty('--h', `${height}px`)
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value

  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  // const { default: NavbarPos } = await import('~/utils/navbarPos')
  const savedTheme = localStorage.getItem('theme')

  // navbarPos = new NavbarPos()
  // navbarPos.init()
  resize.on(calcHeight)

  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
    document.body.classList.toggle('dark-mode', isDarkMode.value)
  }
})

useOnBeforeUnmountDelay(() => {
  // navbarPos && navbarPos.destroy()
  resize.off(calcHeight)
})
</script>

<template>
  <header ref="$el" class="header">
    <div class="header__wrapper container">
      <NuxtLink to="/" class="header__logo-wrapper">
        <span>
          <IconsLogo />
        </span>
      </NuxtLink>
      <nav class="header__list">
        <NuxtLink
          v-for="(item, idx) in navigationList"
          :key="idx"
          :to="item.link"
          class="header__link"
        >
          {{ item.text }}
        </NuxtLink>
      </nav>
      <div class="header__right-menu">
        <button
          class="header__theme-btn"
          aria-label="Theme changer"
          @click="toggleTheme"
        >
          <span>
            <IconsTheme />
          </span>
        </button>
        <button class="header__account">
          <p class="header__account-name">lkosteckiy5@gmail.com</p>
          <img
            src="/images/avatars/1.jpg"
            alt="Avatar"
            class="header__account-img"
          />
        </button>
      </div>
    </div>
  </header>
</template>
