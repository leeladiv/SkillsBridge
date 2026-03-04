/**
 * Public explore / recruiter API service.
 * Fetches public student profiles with filters.
 */
import { api } from './api'

const EXPLORE_PREFIX = '/explore'

export async function fetchPublicProfiles(params = {}) {
  const { data } = await api.get(EXPLORE_PREFIX, { params })
  return data
}

export async function fetchPublicProfile(profileId) {
  const { data } = await api.get(`${EXPLORE_PREFIX}/profiles/${profileId}`)
  return data
}
