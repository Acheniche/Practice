export interface FetchProductsParams {
  category: string
  sort: 'asc' | 'desc'
  minPrice: number
  maxPrice: number
  searchQuery: string
}
