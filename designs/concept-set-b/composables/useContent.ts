import { defaultCampaigns, defaultSections, alternateCampaign } from '~/data/concepts'
export function useContent() {
  const campaigns = useState('gambol-campaigns', () => structuredClone(defaultCampaigns))
  const sections = useState('gambol-sections', () => structuredClone(defaultSections))
  const { concept } = useConcept()
  const campaign = computed(() => campaigns.value[concept.value.id]!)
  const visibleSections = computed(() => sections.value[concept.value.id]!.filter((x) => x.enabled))
  return { campaigns, sections, campaign, visibleSections, alternateCampaign }
}
