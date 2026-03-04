/**
 * Reusable form validation helpers.
 */
export function useFormValidation() {
  function required(value, fieldName = 'This field') {
    if (value == null || String(value).trim() === '') {
      return `${fieldName} is required`
    }
    return null
  }

  function email(value) {
    if (!value) return 'Email is required'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value) ? null : 'Please enter a valid email'
  }

  function minLength(value, min, fieldName = 'Field') {
    if (!value) return null
    return value.length >= min ? null : `${fieldName} must be at least ${min} characters`
  }

  function password(value) {
    const r = required(value, 'Password')
    if (r) return r
    return minLength(value, 8, 'Password') || null
  }

  function match(value, other, fieldName = 'Fields') {
    return value === other ? null : `${fieldName} do not match`
  }

  return { required, email, minLength, password, match }
}
