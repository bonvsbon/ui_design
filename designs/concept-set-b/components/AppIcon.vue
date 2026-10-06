<script setup lang="ts">
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  UserRound,
  X,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  Home,
  SlidersHorizontal,
  Check,
  Truck,
  RotateCcw,
  Feather,
  Layers,
  Footprints,
  ShieldCheck,
  Wind,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings2,
  CircleHelp,
  LayoutGrid,
  Play,
  CheckCircle2,
} from 'lucide-vue-next'
const props = withDefaults(defineProps<{ name: string; size?: number; stroke?: number }>(), {
  size: 20,
  stroke: 1.6,
})
const icons: Record<string, any> = {
  arrow: ArrowUpRight,
  right: ArrowRight,
  left: ArrowLeft,
  search: Search,
  heart: Heart,
  bag: ShoppingBag,
  pin: MapPin,
  user: UserRound,
  close: X,
  plus: Plus,
  minus: Minus,
  down: ChevronDown,
  next: ChevronRight,
  prev: ChevronLeft,
  menu: Menu,
  home: Home,
  filter: SlidersHorizontal,
  check: Check,
  truck: Truck,
  returns: RotateCcw,
  feather: Feather,
  layers: Layers,
  steps: Footprints,
  shield: ShieldCheck,
  wind: Wind,
  up: ArrowUp,
  moveDown: ArrowDown,
  eye: Eye,
  settings: Settings2,
  help: CircleHelp,
  grid: LayoutGrid,
  play: Play,
  success: CheckCircle2,
}
</script>
<template>
  <component
    :is="icons[props.name] || ArrowUpRight"
    :size="size"
    :stroke-width="stroke"
    aria-hidden="true"
  />
</template>
