export interface Crisis {
  id: number
  title: string
  description: string
  status: string
  severity: 'low' | 'medium' | 'high'
  lat: number
  lng: number
}