<script setup lang="ts">
interface iProps {
  title: string
  accountId?: number
  isNewAccount?: boolean
  serverId?: number
}

const props = defineProps<iProps>()

const emit = defineEmits([
  'openMenu',
  'addNewAccount',
  'accountEdit',
  'accountDelete',
])

const route = useRoute()
const $el = ref<HTMLElement | null>(null)
const menuOpened = ref(false)

const toggleMenu = () => {
  menuOpened.value = !menuOpened.value
  emit('openMenu')
}

const outsideClick = event => {
  if (!$el.value.contains(event.target)) {
    menuOpened.value = false
  }
}

const typeOfAccountsRoute = computed(() => {
  return (
    route.fullPath + `/type-of-accounts/${props.serverId}-${props.accountId}`
  )
})

onMounted(() => {
  document.body.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div
    class="broker-type-accounts-item"
    :class="isNewAccount && 'broker-type-accounts-item--new'"
  >
    <div v-if="isNewAccount" class="broker-type-accounts-item__wrapper">
      <button
        class="broker-type-accounts-item__content"
        @click="emit('addNewAccount')"
      >
        <p class="broker-type-accounts-item__title">{{ title }}</p>

        <IconsPlus />
      </button>
    </div>

    <NuxtLink
      v-else
      :to="typeOfAccountsRoute"
      class="broker-type-accounts-item__wrapper"
    >
      <div class="broker-type-accounts-item__content">
        <button
          class="broker-type-accounts-item__btn-wrapper"
          @click.prevent="toggleMenu"
          @click.stop
        >
          <div class="broker-type-accounts-item__btn">
            <span />
            <span />
            <span />
          </div>
        </button>
        <p class="broker-type-accounts-item__title">{{ title }}</p>
      </div>
    </NuxtLink>

    <div
      ref="$el"
      class="broker-type-accounts-item__menu"
      :class="menuOpened && 'broker-type-accounts-item__menu--opened'"
      @click.stop
    >
      <div class="broker-type-accounts-item__menu-wrapper">
        <button
          class="broker-type-accounts-item__menu-btn"
          @click="emit('accountEdit', accountId)"
        >
          <IconsEdit />
          Edit
        </button>
        <button
          class="broker-type-accounts-item__menu-btn"
          @click="emit('accountDelete', accountId)"
        >
          <IconsTrash />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
