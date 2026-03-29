import { describe, it, expect } from 'vitest'
import router from './index.js'

describe('Router', () => {
  it('has routes including Home and Login', () => {
    const routes = router.getRoutes()
    const names = routes.map((r) => r.name).filter(Boolean)
    expect(names).toContain('Home')
    expect(names).toContain('Login')
    expect(names).toContain('Register')
    expect(names.length).toBeGreaterThan(5)
  })
})
