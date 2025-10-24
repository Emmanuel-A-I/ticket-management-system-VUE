<template>
  <div>
    <!-- Header with Wave -->
    <header class="hero-wave">
      <div class="container">
        <h1 style="color: white; text-align: center; padding: 1rem 0">
          Ticket Dashboard
        </h1>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <nav class="nav-mobile">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="color: white; font-weight: bold">Welcome, {{ authStore.user?.name }}</span>
        <button 
          class="mobile-menu-button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      </div>
      
      <div v-if="isMobileMenuOpen" id="mobile-menu" style="margin-top: 1rem">
        <button 
          class="btn btn-primary" 
          @click="handleCreateTicket"
          style="width: 100%; margin-bottom: 0.5rem"
        >
          Create Ticket
        </button>
        <select 
          class="form-select"
          v-model="filter"
          style="width: 100%; margin-bottom: 0.5rem"
        >
          <option value="all">All Tickets</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button 
          class="btn btn-secondary" 
          @click="handleLogout"
          style="width: 100%"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- Desktop Navigation -->
    <nav class="nav-desktop">
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
        <span style="color: white">Welcome, {{ authStore.user?.name }}</span>
        
        <div style="display: flex; gap: 1rem; align-items: center">
          <button 
            class="btn btn-primary" 
            @click="handleCreateTicket"
          >
            Create Ticket
          </button>
          
          <select 
            class="form-select"
            v-model="filter"
            style="min-width: 120px"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          
          <button 
            class="btn btn-secondary" 
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container">
      <div style="padding: 2rem 0">
        <TicketGrid 
          :tickets="filteredTickets"
          @update="handleUpdateTicket"
          @delete="handleDeleteTicket"
        />
        
        <div v-if="filteredTickets.length === 0" style="text-align: center; padding: 3rem; color: #666">
          <p>No tickets found. Create your first ticket to get started!</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import TicketGrid from '../components/TicketGrid.vue'
import { mockTickets } from '../utils/mockData'

const tickets = ref([])
const filter = ref('all')
const isMobileMenuOpen = ref(false)

const authStore = useAuthStore()
const router = useRouter()

// Load mock tickets on component mount
onMounted(() => {
  tickets.value = mockTickets
})

const filteredTickets = computed(() => {
  return filter.value === 'all' 
    ? tickets.value 
    : tickets.value.filter(ticket => ticket.status === filter.value)
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleCreateTicket = () => {
  router.push('/tickets/new')
}

const handleUpdateTicket = (ticket) => {
  router.push(`/tickets/edit/${ticket.id}`)
}

const handleDeleteTicket = (ticketId) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    tickets.value = tickets.value.filter(ticket => ticket.id !== ticketId)
  }
}
</script>