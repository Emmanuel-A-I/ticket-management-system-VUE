<template>
  <div>
    <!-- Header with Wave -->
    <header class="hero-wave">
      <div class="container">
        <h1 style="color: white; text-align: center; padding: 1rem 0">
          {{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}
        </h1>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav-desktop" style="display: flex; justify-content: space-between">
      <button 
        class="btn btn-secondary"
        @click="handleCancel"
      >
        ← Back to Dashboard
      </button>
      <span style="color: white">Welcome, {{ authStore.user?.name }}</span>
    </nav>

    <!-- Form -->
    <main class="container">
      <div style="max-width: 600px; margin: 2rem auto; padding: 0 1rem">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title" class="form-label">
              Ticket Title *
            </label>
            <input
              id="title"
              type="text"
              class="form-input"
              v-model="form.title"
              aria-required="true"
              :aria-invalid="!!errors.title"
              :aria-describedby="errors.title ? 'title-error' : undefined"
              placeholder="Enter a descriptive title"
            />
            <div v-if="errors.title" id="title-error" style="color: #dc2626; fontSize: 0.875rem; marginTop: 0.25rem">
              {{ errors.title }}
            </div>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">
              Description *
            </label>
            <textarea
              id="description"
              class="form-textarea"
              v-model="form.description"
              rows="6"
              aria-required="true"
              :aria-invalid="!!errors.description"
              :aria-describedby="errors.description ? 'description-error' : undefined"
              placeholder="Describe the issue or request in detail..."
            />
            <div v-if="errors.description" id="description-error" style="color: #dc2626; fontSize: 0.875rem; marginTop: 0.25rem">
              {{ errors.description }}
            </div>
          </div>

          <div style="display: grid; gridTemplateColumns: 1fr 1fr; gap: 1rem">
            <div class="form-group">
              <label for="status" class="form-label">
                Status
              </label>
              <select
                id="status"
                class="form-select"
                v-model="form.status"
              >
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="priority" class="form-label">
                Priority
              </label>
              <select
                id="priority"
                class="form-select"
                v-model="form.priority"
              >
                <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justifyContent: flex-end; marginTop: 2rem">
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleCancel"
              :disabled="loading"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Saving...' : (isEditing ? 'Update Ticket' : 'Create Ticket') }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { mockTickets, generateNewId, priorityOptions, statusOptions } from '../utils/mockData'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errors = ref({})

const form = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const isEditing = computed(() => !!route.params.id)

// Load ticket data if editing
onMounted(() => {
  if (isEditing.value) {
    const ticketToEdit = mockTickets.find(ticket => ticket.id === parseInt(route.params.id))
    if (ticketToEdit) {
      form.title = ticketToEdit.title
      form.description = ticketToEdit.description
      form.status = ticketToEdit.status
      form.priority = ticketToEdit.priority
    }
  }
})

const validateForm = () => {
  const newErrors = {}
  
  if (!form.title.trim()) {
    newErrors.title = 'Title is required'
  } else if (form.title.length < 5) {
    newErrors.title = 'Title must be at least 5 characters'
  }
  
  if (!form.description.trim()) {
    newErrors.description = 'Description is required'
  } else if (form.description.length < 10) {
    newErrors.description = 'Description must be at least 10 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  // Simulate API call delay
  setTimeout(() => {
    if (isEditing.value) {
      alert(`Ticket "${form.title}" updated successfully!`)
    } else {
      // In a real app, this would create a new ticket via API
      const newTicket = {
        id: generateNewId(),
        title: form.title,
        description: form.description,
        status: form.status,
        priority: form.priority,
        createdAt: new Date().toISOString(),
        createdBy: authStore.user.email
      }
      alert(`Ticket "${form.title}" created successfully!`)
    }
    
    router.push('/dashboard')
    loading.value = false
  }, 1000)
}

const handleCancel = () => {
  router.push('/dashboard')
}
</script>