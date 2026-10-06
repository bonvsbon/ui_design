const thb = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 })
export const formatPrice = (n: number) => thb.format(n).replace('THB', '฿').replace(/\s/g, '')
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
