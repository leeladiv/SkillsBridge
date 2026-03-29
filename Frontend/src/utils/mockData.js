/**
 * Mock data for development and demo when backend is not available.
 * Replace with real API calls in production.
 */

export const MOCK_UNIVERSITIES = [
  { id: 'u1', name: 'Stanford University', approved: true },
  { id: 'u2', name: 'MIT', approved: true },
  { id: 'u3', name: 'Harvard University', approved: true },
  { id: 'u4', name: 'Berkeley', approved: true },
]

export const MOCK_STUDENT = {
  id: 's1',
  fullName: 'Alex Johnson',
  email: 'alex@example.com',
  university: 'u1',
  bio: 'Computer Science student with a focus on full-stack development.',
  image: null,
  skills: ['Vue.js', 'JavaScript', 'Node.js', 'Python'],
  projects: [
    {
      id: 'p1',
      title: 'SkillsBridge Clone',
      description: 'A portfolio platform for students.',
      technologies: ['Vue 3', 'Tailwind', 'Pinia'],
      links: [{ label: 'GitHub', url: 'https://github.com' }],
    },
  ],
  isPublic: true,
  role: 'student',
  contact: { linkedIn: '', website: '', phone: '' },
}

export const MOCK_PUBLIC_PROFILES = [
  { ...MOCK_STUDENT, id: 's1', fullName: 'Alex Johnson' },
  { ...MOCK_STUDENT, id: 's2', fullName: 'Sam Lee', skills: ['React', 'TypeScript'] },
  { ...MOCK_STUDENT, id: 's3', fullName: 'Jordan Smith', skills: ['Python', 'ML'] },
]

export const MOCK_UNIVERSITY_REQUESTS = [
  { id: 'r1', universityName: 'New State College', requesterEmail: 'user@example.com', status: 'pending' },
]
