export interface DateRange {
  from: Date
  to: Date
}

export interface User {
  name: string
  email: string
  type: string
  createdAt: Date
  earnings: number
  followers: number
  engagement: number
  totalPosts: number
}
