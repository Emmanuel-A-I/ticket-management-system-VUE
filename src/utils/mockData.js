// Mock data for development
export const mockTickets = [
  {
    id: 1,
    title: 'Login page not working',
    description: 'Users are unable to log in with correct credentials. Getting 500 error.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'user@example.com'
  },
  {
    id: 2,
    title: 'Mobile responsive issues',
    description: 'The dashboard layout breaks on mobile devices below 375px width.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-14T14:20:00Z',
    createdBy: 'admin@example.com'
  },
  {
    id: 3,
    title: 'Update user profile feature',
    description: 'Allow users to update their profile information and avatar.',
    status: 'open',
    priority: 'low',
    createdAt: '2024-01-13T09:15:00Z',
    createdBy: 'user@example.com'
  },
  {
    id: 4,
    title: 'Password reset email delay',
    description: 'Password reset emails are taking over 10 minutes to arrive.',
    status: 'closed',
    priority: 'high',
    createdAt: '2024-01-12T16:45:00Z',
    createdBy: 'admin@example.com'
  },
  {
    id: 5,
    title: 'Add dark mode support',
    description: 'Implement dark mode theme across the entire application.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-01-11T11:20:00Z',
    createdBy: 'user@example.com'
  },
  {
    id: 6,
    title: 'Database connection timeout',
    description: 'Random database connection timeouts during peak hours.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-10T13:10:00Z',
    createdBy: 'admin@example.com'
  }
]

// Helper function to generate new ticket ID
export const generateNewId = () => {
  return Math.max(...mockTickets.map(ticket => ticket.id)) + 1
}

// Priority options for forms
export const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

// Status options for forms
export const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' }
]