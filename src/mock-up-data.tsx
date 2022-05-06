export type ProductCategory = 'TCAS' | 'High School'
export type Product = {
  id: number
  title: string
  subject: string
  category: ProductCategory
}

export const productList: Product[] = [
  { id: 1, title: 'Applied Mathematics', subject: 'Math', category: 'TCAS' },
  { id: 2, title: 'Applied Physics', subject: 'Physics', category: 'TCAS' },
  { id: 3, title: 'Applied Chemistry', subject: 'Chemistry', category: 'TCAS' },
  { id: 4, title: 'Applied Biology', subject: 'Biology', category: 'TCAS' },
  { id: 5, title: 'Applied Mathematics', subject: 'Math', category: 'High School' },
  { id: 6, title: 'Applied Physics', subject: 'Physics', category: 'High School' },
  { id: 7, title: 'Applied Chemistry', subject: 'Chemistry', category: 'High School' },
  { id: 8, title: 'Applied Biology', subject: 'Biology', category: 'High School' },
]
