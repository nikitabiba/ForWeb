import HttpService from './HttpService'
import type {
  NobelApiResponse,
  LaureateApiResponse,
  PaginationParams,
  FilterParams,
  LaureateDetails
} from '@/types/nobel'
import { NobelApiResponseCodec, LaureateApiResponseCodec } from '@/codecs/nobel.codec'
import { decodeOrThrow } from '@/utils/decode'

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
    const rawData = await this.get<unknown>(url)
    return decodeOrThrow(NobelApiResponseCodec, rawData)
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
    const rawData = await this.get<unknown>(url)
    return decodeOrThrow(LaureateApiResponseCodec, rawData)
  }

  async getLaureateById(id: string): Promise<LaureateDetails> {
    const rawData = await this.get<unknown>(`/laureate/${id}`)
    const response = decodeOrThrow(LaureateApiResponseCodec, rawData)
    return response.laureates[0]
  }
}

export default new NobelService()