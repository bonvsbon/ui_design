import { concepts } from '~/data/concepts'
export function useConcept() {
  const route = useRoute()
  const concept = computed(
    () => concepts.find((c) => c.id === route.params.concept) || concepts[0]!
  )
  const base = computed(() => '/' + concept.value.id)
  return { concept, base }
}
