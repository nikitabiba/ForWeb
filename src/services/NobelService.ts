import HttpService from './HttpService'
import type {
  NobelApiResponse,
  LaureateApiResponse,
  PaginationParams,
  FilterParams,
  LaureateDetails
} from '@/types/nobel'

class NobelService extends HttpService {
  constructor() {
    super('https://api.nobelprize.org/2.1')
  }

  async getNobelPrizes(params?: PaginationParams & FilterParams): Promise<NobelApiResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.offset !== undefined) {
      queryParams.append('offset', params.offset.toString())
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString())
    }
    if (params?.nobelPrizeYear) {
      queryParams.append('nobelPrizeYear', params.nobelPrizeYear)
    }
    if (params?.yearTo) {
      queryParams.append('yearTo', params.yearTo)
    }
    if (params?.nobelPrizeCategory) {
      queryParams.append('nobelPrizeCategory', params.nobelPrizeCategory)
    }

    const url = `/nobelPrizes${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<NobelApiResponse>(url)
  }

  async getLaureates(params?: PaginationParams & FilterParams): Promise<LaureateApiResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.offset !== undefined) {
      queryParams.append('offset', params.offset.toString())
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString())
    }
    if (params?.nobelPrizeYear) {
      queryParams.append('nobelPrizeYear', params.nobelPrizeYear)
    }
    if (params?.nobelPrizeCategory) {
      queryParams.append('nobelPrizeCategory', params.nobelPrizeCategory)
    }

    const url = `/laureates${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return this.get<LaureateApiResponse>(url)
  }

  async getLaureateById(id: string): Promise<LaureateDetails> {
    const response = await this.get<LaureateApiResponse>(`/laureate/${id}`)
    return response.laureates[0]
  }
}

export default new NobelService()