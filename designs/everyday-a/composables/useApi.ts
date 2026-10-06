import { mockApi, type ContentApi } from '~/mock/api'

/** Single switch-point between mock data and a real API (see mock/http-api.example.ts). */
export function useApi(): ContentApi {
  return mockApi
}

/** Shared, SSR-cached global settings */
export function useSite() {
  const { data } = useAsyncData('site', () => useApi().getSite())
  return data
}
