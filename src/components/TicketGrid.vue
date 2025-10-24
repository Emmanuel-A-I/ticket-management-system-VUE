<template>
  <div class="ticket-grid">
    <TicketCard
      v-for="ticket in tickets"
      :key="ticket.id"
      :ticket="ticket"
      @update="$emit('update', ticket)"
      @delete="$emit('delete', ticket.id)"
    />
  </div>
</template>

<script setup>
import TicketCard from './TicketCard.vue'

defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

defineEmits(['update', 'delete'])
</script>