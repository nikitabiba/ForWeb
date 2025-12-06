export interface NobelPrize {
  awardYear: string
  category: {
    en: string
    no: string
    se: string
  }
  dateAwarded: string
  prizeAmount: number
  prizeAmountAdjusted: number
  links: {
    rel: string
    href: string
    action: string
    types: string
  }
  laureates?: NobelLaureate[]
}

export interface NobelLaureate {
  id: string
  knownName?: {
    en: string
  }
  orgName?: {
    en: string
  }
  portion: string
  sortOrder: string
  motivation?: {
    en: string
  }
  links: {
    rel: string
    href: string
    action: string
    types: string
  }
}

export interface LaureateDetails {
  id: string
  knownName?: {
    en: string
  }
  orgName?: {
    en: string
  }
  givenName?: {
    en: string
  }
  familyName?: {
    en: string
  }
  birth?: {
    date: string
    place: {
      city?: {
        en: string
      }
      country?: {
        en: string
      }
    }
  }
  founded?: {
    date: string
    place: {
      city?: {
        en: string
      }
      country?: {
        en: string
      }
    }
  }
  nobelPrizes: Array<{
    awardYear: string
    category: {
      en: string
    }
    motivation?: {
      en: string
    }
  }>
}

export interface NobelApiResponse {
  nobelPrizes: NobelPrize[]
}

export interface LaureateApiResponse {
  laureates: LaureateDetails[]
}

export interface PaginationParams {
  offset: number
  limit: number
}

export interface FilterParams {
  nobelPrizeYear?: string
  yearTo?: string
  nobelPrizeCategory?: string
}