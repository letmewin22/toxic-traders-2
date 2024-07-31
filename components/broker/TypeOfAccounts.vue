<script setup lang="ts">
import type { iBrokerServerAccount } from '~/types/broker/brokerServer'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getAllBrokerServers } = useBrokerServer()
const { deleteBrokerAccount } = useBrokerServerAccount()

const newAccountModalOpened = ref(false)
const editAccountModalState = ref<{
  isOpened: boolean
  account: iBrokerServerAccount
}>({
  isOpened: false,
  account: null,
})
const accountIdToDelete = ref(null)

const deleteAccountModalOpened = ref(false)
const accountList = ref<iBrokerServerAccount[]>([])

const newAccountModalOpen = () => {
  newAccountModalOpened.value = true
  document.body.classList.add('modal-open')
}

const editAccountModalOpen = (accountId: number) => {
  editAccountModalState.value = {
    account: accountList.value.find(item => item.id === accountId),
    isOpened: true,
  }

  document.body.classList.add('modal-open')
}

const editAccountModalClose = () => {
  editAccountModalState.value = {
    account: null,
    isOpened: false,
  }
  document.body.classList.remove('modal-open')
}

const newAccountModalClose = () => {
  newAccountModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const deleteAccountModalOpen = (accountId: number) => {
  deleteAccountModalOpened.value = true
  document.body.classList.add('modal-open')

  accountIdToDelete.value = accountId
}

const deleteAccountModalClose = () => {
  deleteAccountModalOpened.value = false

  accountIdToDelete.value = null
}

const onCreated = newAccount => {
  accountList.value = [...accountList.value, newAccount]
}

const onEdit = editedAccount => {
  accountList.value = accountList.value.filter(
    item => item.id !== editedAccount.brokerServerAccountId
  )

  accountList.value = [...accountList.value, editedAccount]
}

const onDelete = async () => {
  await deleteBrokerAccount(accountIdToDelete.value)

  accountList.value = accountList.value.filter(
    item => item.id !== accountIdToDelete.value
  )

  deleteAccountModalClose()
}

onMounted(async () => {
  const { brokerServerAccounts } = await getAllBrokerServers(props.brokerId)

  accountList.value = brokerServerAccounts.flat()
})
</script>

<template>
  <div class="broker-type-accounts">
    <div class="broker-type-accounts__list">
      <BrokerTypeOfAccountsItem
        title="Add new"
        :is-new-account="true"
        @add-new-account="newAccountModalOpen"
      />
      <BrokerTypeOfAccountsItem
        v-for="(account, idx) in accountList"
        :key="idx"
        :account-id="account?.id"
        :title="account?.accountType"
        :server-id="account?.serverId"
        class="broker-type-accounts__item"
        @account-edit="editAccountModalOpen"
        @account-delete="deleteAccountModalOpen"
      />
    </div>

    <BrokerTypeOfAccountsNewModal
      :modal-opened="newAccountModalOpened"
      :broker-id="brokerId"
      @close="newAccountModalClose"
      @created="onCreated"
    />
    <BrokerTypeOfAccountsEditModal
      :modal-opened="editAccountModalState.isOpened"
      :account="editAccountModalState.account"
      @close="editAccountModalClose"
      @edit="onEdit"
    />

    <TheModal
      :modal-opened="deleteAccountModalOpened"
      title="Delete confirmation"
      @close="deleteAccountModalClose"
    >
      <div class="broker-type-accounts-item__modal-wrapper">
        <p class="broker-type-accounts-item__delete-text">
          Are you sure you want to delete this item? This action cannot be
          prevented
        </p>
        <div class="broker-type-accounts-item__modal-btn-wrapper">
          <TheButton
            class="broker-type-accounts-item__modal-btn"
            tag="button"
            variant="close"
            button-size="medium"
          >
            Cancel
          </TheButton>
          <TheButton
            class="broker-type-accounts-item__modal-btn"
            tag="button"
            variant="danger"
            button-size="medium"
            @click="onDelete()"
          >
            Delete
          </TheButton>
        </div>
      </div>
    </TheModal>
  </div>
</template>
