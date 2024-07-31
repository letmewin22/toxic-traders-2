<script setup lang="ts">
import type { iAccountModalItem } from '~/types'
import type { iBrokerServer } from '~/types/broker/brokerServer'

interface iProps {
  modalOpened: boolean
  brokerId: number
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'created'])

const { createBrokerAccount } = useBrokerServerAccount()
const { getAllBrokerServers } = useBrokerServer()

const isPassword = ref(false)
const serversList = ref<iBrokerServer[]>([])
const serversNames = ref<string[]>([])
const selectedServer = ref<number>(null)
const createdAccountItems = ref<iAccountModalItem[]>([
  {
    required: false,
    id: 'account-name',
    name: 'Account name',
    type: 'text',
    value: '',
    placeholder: 'Account Name',
  },
  {
    required: false,
    id: 'account-login',
    name: 'Account login',
    type: 'text',
    value: '',
    placeholder: 'Login',
  },
  {
    required: false,
    id: 'account-password',
    name: 'Account password',
    type: 'password',
    value: '',
    placeholder: 'Password',
    isRightButton: true,
  },
  {
    placeholder: 'Server',
    options: serversNames,
  },
])

const newAccountModalClose = () => {
  emit('close')
}

const showPassword = () => {
  isPassword.value = !isPassword.value
}

const onChange = (e: iInputData) => {
  createdAccountItems.value = createdAccountItems.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }

    return item
  })

  console.log(createdAccountItems.value)
}

const getSelectedItem = (item: string) => {
  serversList.value.forEach(server => {
    if (server.serverName === item) {
      selectedServer.value = server.id
    }
  })

  console.log(selectedServer.value)
}

const createAccount = async () => {
  const { id } = await createBrokerAccount(
    createdAccountItems.value[0].value,
    createdAccountItems.value[1].value,
    createdAccountItems.value[2].value,
    selectedServer.value
  )

  const newAccount = {
    accountType: createdAccountItems.value[0].value,
    login: createdAccountItems.value[1].value,
    password: createdAccountItems.value[2].value,
    brokerServerId: selectedServer.value,
    id,
  }

  emit('created', newAccount)
  emit('close')
}

onMounted(async () => {
  const { brokerServers } = await getAllBrokerServers(props.brokerId)

  serversList.value = brokerServers
  serversNames.value = serversList.value.map(item => item.serverName)
})
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Add new Account"
    @close="newAccountModalClose"
  >
    <div class="broker-type-accounts__modal-list">
      <div
        v-for="(input, idx) in createdAccountItems"
        :key="idx"
        class="broker-type-accounts__modal-item"
      >
        <CustomSelect
          v-if="input.options"
          :options="input.options"
          :placeholder="input.placeholder"
          @select="getSelectedItem"
        />
        <TheInput
          v-else
          :id="input.id"
          :required="input.required"
          :name="input.name"
          :type="input.type"
          :placeholder="input.placeholder"
          :is-right-button="input.isRightButton"
          @input-value="onChange"
          @right-click="showPassword"
        >
          <template #right-icon>
            <IconsPasswordEye :is-visible="isPassword" />
          </template>
        </TheInput>
      </div>
    </div>
    <div class="broker-type-accounts__buttons">
      <TheButton
        tag="button"
        variant="close"
        button-size="medium"
        @click="newAccountModalClose"
      >
        Close
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        @click="createAccount"
      >
        Add
      </TheButton>
    </div>
  </TheModal>
</template>
