<template>
  <div
    class="flex flex-col px-8 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      v-if="state.isOpen"
      class="flex mt8 animate__animated animate__fadeInUp animate__faster"
      :class="{animate__fadeOutUp: state.isClosing}"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Página</span>
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Usuário</span>
          <span class="font-medium text-gray-700">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </div>

    <div v-if="!state.isOpen" class="flex justify-end mt-8">
      <icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>

  </div>
</template>

<script>
import Badge from '@/views/feedbacks/FeedbackCard/Badge.vue'
import { getDiffTimeBetweenCurrentDate } from '@/utils/date'
import palette from '../../../../palette'
import { reactive } from 'vue'
import Icon from '@/components/Icon/index.vue'
import { wait } from '@/utils/timeout'

export default {
  methods: { getDiffTimeBetweenCurrentDate },
  components: { Badge, Icon },
  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true }
  },
  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })
    async function handleToggle () {
      state.isClosing = true
      await wait(150)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      brandColors: palette.brand
    }
  }
}
</script>
