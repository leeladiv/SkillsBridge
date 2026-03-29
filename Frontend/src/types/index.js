/**
 * SkillsBridge – Frontend type definitions and data shapes.
 * Use these for consistency and future backend integration.
 */

/** @typedef {'student' | 'admin' | 'public'} UserRole */

/**
 * @typedef {Object} Student
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} [university] - University ID or name
 * @property {string} [bio]
 * @property {string} [image]
 * @property {string[]} [skills]
 * @property {Project[]} [projects]
 * @property {boolean} [isPublic]
 * @property {UserRole} [role]
 * @property {Object} [contact] - e.g. { linkedIn, website, phone }
 */

/**
 * @typedef {Object} University
 * @property {string} id
 * @property {string} name
 * @property {boolean} [approved]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {string[]} [technologies]
 * @property {Array<{label: string, url: string}>} [links]
 */

/**
 * @typedef {Object} UniversityRequest
 * @property {string} id
 * @property {string} universityName
 * @property {string} [requesterEmail]
 * @property {string} [status] - e.g. 'pending', 'approved', 'rejected'
 */

export const ROLES = Object.freeze({
  STUDENT: 'student',
  ADMIN: 'admin',
  PUBLIC: 'public',
})
