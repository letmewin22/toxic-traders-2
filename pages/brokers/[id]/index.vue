<script lang="ts" setup>
const route = useRoute()
const brokerId = route.params.id
const settingsModalOpened = ref(false)
const historyModalOpened = ref(false)
const settingsSearch = ref({
  id: 'select-search',
  required: false,
  name: 'Search broker',
  type: 'text',
  placeholder: 'Search broker',
  isRightButton: true,
})

const settingsModalOpen = () => {
  settingsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const settingsModalClose = () => {
  settingsModalOpened.value = false
}

const settingsOnChange = (val: string) => {
  console.log(val)
}

const historyModalOpen = () => {
  historyModalOpened.value = true
  document.body.classList.add('modal-open')
}

const historyModalClose = () => {
  historyModalOpened.value = false
}
</script>

<template>
  <main class="main-broker">
    <div class="container main-broker__wrapper">
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerCompanyName :broker-id="Number(brokerId)" />
            <BrokerCategory :broker-id="Number(brokerId)" />
            <BrokerServerLocation :broker-id="Number(brokerId)" />
            <BrokerServerAddresses :broker-id="Number(brokerId)" />
            <BrokerWebsites :broker-id="Number(brokerId)" />
            <BrokerReviews :broker-id="Number(brokerId)" />
          </div>
        </div>
      </aside>
      <section class="main-broker__content">
        <div class="main-broker__item">
          <h2 class="main-broker__title">Servers</h2>
          <BrokerServersTable :broker-id="Number(brokerId)" />
        </div>
        <div class="main-broker__item">
          <h2 class="main-broker__title">Type of Accounts</h2>
          <BrokerTypeOfAccounts :broker-id="Number(brokerId)" />
        </div>
        <div class="main-broker__item">
          <h2 class="main-broker__title">Statistics</h2>
          <BrokerStatistics :broker-id="Number(brokerId)" />
        </div>
      </section>
      <aside class="broker-aside">
        <div class="broker-aside__wrapper">
          <div class="broker-aside__content">
            <BrokerNotes :broker-id="Number(brokerId)" />
            <BrokerRegulator :broker-id="Number(brokerId)" />
            <BrokerPlatforms :broker-id="Number(brokerId)" />
            <BrokerRestrictedCountries :broker-id="Number(brokerId)" />
            <BrokerDepositMethods :broker-id="Number(brokerId)" />
            <div class="broker-aside__btn-wrapper">
              <TheButton
                tag="button"
                button-size="medium"
                variant="outlined"
                @click="historyModalOpen"
              >
                History
              </TheButton>
              <TheButton
                tag="button"
                button-size="medium"
                variant="fill"
                disabled
                @click="settingsModalOpen"
              >
                Settings
                <template #start-icon>
                  <IconsSettings />
                </template>
              </TheButton>
            </div>
          </div>
        </div>
      </aside>
    </div>
    <BrokerHistory
      :broker-id="Number(brokerId)"
      :is-opened="historyModalOpened"
      @close="historyModalClose"
    />

    <TheModal
      :modal-opened="settingsModalOpened"
      title="Settings"
      @close="settingsModalClose"
    >
      <div class="main-broker__settings">
        <div class="main-broker__settings-item">
          <p class="main-broker__settings-title">Transfer</p>
          <CustomSelect
            :options="['Broker 1', 'Broker 2', 'Broker 3']"
            :search-input="settingsSearch"
            placeholder="Select existing broker"
            class="main-broker__settings-select"
            @search="settingsOnChange"
          />
        </div>
        <div class="main-broker__settings-item">
          <p class="main-broker__settings-title">Delete this broker</p>
          <TheButton
            tag="button"
            variant="danger"
            button-size="medium"
            class="main-broker__settings-delete"
            @click="settingsModalClose"
          >
            Delete
          </TheButton>
        </div>
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          class="main-broker__settings-close"
          @click="settingsModalClose"
        >
          Close
        </TheButton>
      </div>
    </TheModal>
  </main>
</template>
