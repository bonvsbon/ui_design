import type { Store } from '~/types'

/** Retail locations (CMS / ERP: "Stores"). Mock data — names are generic retail formats. */
export const stores: Store[] = [
  { id: 's1', name: 'GAMBOL Shop สยาม', type: 'GAMBOL Shop', province: 'กรุงเทพมหานคร', district: 'ปทุมวัน', address: 'ชั้น 2 ศูนย์การค้าย่านสยาม ถ.พระราม 1', hours: '10:00–21:00', phone: '02-408-5074', lat: 13.746, lng: 100.534 },
  { id: 's2', name: 'ห้างสรรพสินค้า สาขาบางนา', type: 'Department Store', province: 'กรุงเทพมหานคร', district: 'บางนา', address: 'แผนกรองเท้า ชั้น 1 ถ.บางนา-ตราด', hours: '10:00–21:00', phone: '02-408-5074', lat: 13.668, lng: 100.634 },
  { id: 's3', name: 'ห้างสรรพสินค้า สาขาลาดพร้าว', type: 'Department Store', province: 'กรุงเทพมหานคร', district: 'จตุจักร', address: 'แผนกรองเท้า ชั้น 2 ถ.พหลโยธิน', hours: '10:00–22:00', phone: '02-408-5074', lat: 13.816, lng: 100.561 },
  { id: 's4', name: 'ร้านรองเท้า ตลาดมหาชัย', type: 'Shoe Store', province: 'สมุทรสาคร', district: 'เมืองสมุทรสาคร', address: 'ถ.เศรษฐกิจ 1 ใกล้ตลาดมหาชัย', hours: '08:00–19:00', phone: '02-408-5074', lat: 13.547, lng: 100.274 },
  { id: 's5', name: 'ห้างสรรพสินค้า สาขาเชียงใหม่', type: 'Department Store', province: 'เชียงใหม่', district: 'เมืองเชียงใหม่', address: 'แผนกรองเท้า ชั้น 1 ถ.ห้วยแก้ว', hours: '10:00–21:00', phone: '02-408-5074', lat: 18.796, lng: 98.968 },
  { id: 's6', name: 'GAMBOL Shop ภูเก็ต', type: 'GAMBOL Shop', province: 'ภูเก็ต', district: 'กะทู้', address: 'ถนนคนเดินป่าตอง ใกล้ชายหาด', hours: '11:00–23:00', phone: '02-408-5074', lat: 7.896, lng: 98.296 },
  { id: 's7', name: 'ห้างสรรพสินค้า สาขาขอนแก่น', type: 'Department Store', province: 'ขอนแก่น', district: 'เมืองขอนแก่น', address: 'แผนกรองเท้า ชั้น 1 ถ.ศรีจันทร์', hours: '10:00–21:00', phone: '02-408-5074', lat: 16.433, lng: 102.825 },
  { id: 's8', name: 'ร้านรองเท้า หาดใหญ่', type: 'Shoe Store', province: 'สงขลา', district: 'หาดใหญ่', address: 'ถ.นิพัทธ์อุทิศ 3', hours: '09:00–20:00', phone: '02-408-5074', lat: 7.006, lng: 100.468 },
  { id: 's9', name: 'ห้างสรรพสินค้า สาขาพัทยา', type: 'Department Store', province: 'ชลบุรี', district: 'บางละมุง', address: 'แผนกรองเท้า ชั้น G ถ.พัทยาสาย 2', hours: '11:00–23:00', phone: '02-408-5074', lat: 12.935, lng: 100.889 },
]

export const provinces = [...new Set(stores.map((s) => s.province))]
export const districtsOf = (province: string) => [...new Set(stores.filter((s) => s.province === province).map((s) => s.district))]
