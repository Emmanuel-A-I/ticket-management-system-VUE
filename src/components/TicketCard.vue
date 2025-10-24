<template>
  <article 
    :class="['ticket-card', statusColors[ticket.status]]"
    :aria-labelledby="`ticket-title-${ticket.id}`"
  >
    <header class="flex justify-between items-start mb-3">
      <h3 
        :id="`ticket-title-${ticket.id}`"
        class="text-lg font-semibold"
        style="margin: 0"
      >
        {{ ticket.title }}
      </h3>
      <div class="flex gap-2">
        <span :class="['status-badge', statusColors[ticket.status]]">
          {{ statusLabels[ticket.status] }}
        </span>
        <button
          @click="isCollapsed = !isCollapsed"
          class="p-1 hover:bg-white/50 rounded"
          :aria-expanded="!isCollapsed"
          :aria-controls="`ticket-details-${ticket.id}`"
          style="background: none; border: none; cursor: pointer; font-size: 1.2rem"
        >
          {{ isCollapsed ? '▼' : '▲' }}
        </button>
      </div>
    </header>
    
    <div v-if="!isCollapsed" :id="`ticket-details-${ticket.id}`">
      <p class="text-gray-700 mb-3" style="margin-bottom: 1rem">
        {{ ticket.description }}
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 0.75rem">
        <div>
          <span style="font-weight: 600">
            Priority: {{ priorityLabels[ticket.priority] }}
          </span>
          <br />
          <span style="color: #666; font-size: 0.8rem">
            Created: {{ formatDate(ticket.createdAt) }}
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="$emit('update', ticket)"
            class="btn btn-primary"
            style="padding: 0.375rem 0.75rem; font-size: 0.875rem"
            :aria-label="`Edit ticket: ${ticket.title}`"
          >
            Edit
          </button>
          <button
            @click="$emit('delete', ticket.id)"
            class="btn btn-secondary"
            style="padding: 0.375rem 0.75rem; font-size: 0.875rem; background-color: #000000"
            :aria-label="`Delete ticket: ${ticket.title}`"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

defineEmits(['update', 'delete'])

const isCollapsed = ref(false)

const statusColors = {
  open: 'status-open',
  in_progress: 'status-in-progress', 
  closed: 'status-closed'
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium', 
  high: 'High'
}

const statusLabels = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>