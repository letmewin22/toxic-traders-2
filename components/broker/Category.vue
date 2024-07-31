<script setup lang="ts">
import { getBrokerCategoriesList } from '~/utils/api/brokers/brokerCategoriesList'
import type { iInput } from '~/types'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const categoryModalOpened = ref(false)
const categoryOptions = ref<string[]>([])
const categoriesData = ref<string[]>([])
const categoryValue = ref<string>('')
const activeCategory = ref<string>('')

const categoryInputData = {
  required: false,
  id: 'category',
  name: 'Category',
  type: 'text',
  value: '',
  placeholder: 'Category name',
}

const { createCategories, getCategories } = useBrokerCategories()

const categoryOnChange = (input: iInput) => {
  categoryValue.value = input.value
}

const { addToast } = useToasts()

const onAddCategory = async () => {
  await createCategories(props.brokerId, categoryValue.value)

  addToast({
    color: ToastColor.success,
    text: 'Category successfully created.',
  })

  categoriesData.value = [categoryValue.value, ...categoriesData.value]

  activeCategory.value = categoryValue.value
  categoryValue.value = ''
  categoryModalClose()
}

watch(categoriesData, () => {
  categoryOptions.value = categoriesData.value
})

const categoryModalOpen = () => {
  categoryModalOpened.value = true
  document.body.classList.add('modal-open')
}

const categoryModalClose = () => {
  categoryModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const onSelectCategory = async (value: string) => {
  activeCategory.value = value

  await createCategories(props.brokerId, value)
}

onMounted(async () => {
  categoriesData.value = await getBrokerCategoriesList()

  try {
    const brokerCategories = await getCategories(props.brokerId)

    if (brokerCategories.length) {
      activeCategory.value = brokerCategories[0]
    }
  } catch (error) {}
})
</script>

<template>
  <div class="category">
    <TheAccordion
      title="Category"
      additional-button="Add new"
      :is-inputs="true"
      @open="categoryModalOpen"
    >
      <CustomSelect
        :options="categoryOptions"
        placeholder="Choose category"
        :value="activeCategory"
        @select="onSelectCategory"
      />
    </TheAccordion>
    <TheModal
      :modal-opened="categoryModalOpened"
      title="Add new category"
      @close="categoryModalClose"
    >
      <TheInput
        :id="categoryInputData.id"
        :required="categoryInputData.required"
        :name="categoryInputData.name"
        :type="categoryInputData.type"
        :placeholder="categoryInputData.placeholder"
        :value="categoryValue"
        class="category__modal-input"
        @input-value="categoryOnChange"
      />
      <div class="category__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="categoryModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="onAddCategory()"
        >
          Add
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>
~/assets/api/brokers/brokerCategoriesList~/utils/api/brokers/brokerCategoriesList
