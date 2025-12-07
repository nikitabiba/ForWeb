import * as t from 'io-ts'

const nullable = <T extends t.Mixed>(codec: T) => t.union([codec, t.null, t.undefined])

export const LocalizedTextCodec = t.partial({
  en: t.string,
  no: t.string,
  se: t.string,
})

export const PlaceCodec = t.partial({
  city: LocalizedTextCodec,
  country: LocalizedTextCodec,
  cityNow: LocalizedTextCodec,
  countryNow: LocalizedTextCodec,
  continent: LocalizedTextCodec,
  locationString: LocalizedTextCodec,
})

export const BirthCodec = t.partial({
  date: t.string,
  place: PlaceCodec,
})

export const FoundedCodec = t.partial({
  date: t.string,
  place: PlaceCodec,
})

export const NobelPrizeInLaureateCodec = t.intersection([
  t.type({
    awardYear: t.string,
    category: LocalizedTextCodec,
  }),
  t.partial({
    categoryFullName: LocalizedTextCodec,
    sortOrder: t.string,
    portion: t.string,
    dateAwarded: t.string,
    prizeStatus: t.string,
    motivation: LocalizedTextCodec,
    prizeAmount: t.number,
    prizeAmountAdjusted: t.number,
    affiliations: t.array(t.unknown),
    residences: t.array(t.unknown),
    links: t.unknown,
  }),
])

export const LaureateDetailsCodec = t.intersection([
  t.type({
    id: t.string,
    nobelPrizes: t.array(NobelPrizeInLaureateCodec),
  }),
  t.partial({
    knownName: LocalizedTextCodec,
    orgName: LocalizedTextCodec,
    givenName: LocalizedTextCodec,
    familyName: LocalizedTextCodec,
    fullName: LocalizedTextCodec,
    fileName: t.string,
    gender: t.string,
    birth: BirthCodec,
    death: t.partial({
      date: t.string,
      place: PlaceCodec,
    }),
    founded: FoundedCodec,
    dissolved: t.partial({
      date: t.string,
      place: PlaceCodec,
    }),
    links: t.unknown,
    wikipedia: t.unknown,
    wikidata: t.unknown,
    sameAs: t.array(t.string),
  }),
])

export const LinkCodec = t.intersection([
  t.type({
    rel: t.string,
    href: t.string,
    action: t.string,
  }),
  t.partial({
    types: t.string,
    title: t.string,
    class: t.array(t.string),
  }),
])

export const NobelLaureateCodec = t.intersection([
  t.type({
    id: t.string,
    portion: t.string,
    sortOrder: t.string,
    links: LinkCodec,
  }),
  t.partial({
    knownName: LocalizedTextCodec,
    orgName: LocalizedTextCodec,
    fullName: LocalizedTextCodec,
    motivation: LocalizedTextCodec,
  }),
])

export const CategoryCodec = t.intersection([
  t.type({
    en: t.string,
  }),
  t.partial({
    no: t.string,
    se: t.string,
  }),
])

export const NobelPrizeCodec = t.intersection([
  t.type({
    awardYear: t.string,
    category: CategoryCodec,
    prizeAmount: t.number,
    prizeAmountAdjusted: t.number,
    links: LinkCodec,
  }),
  t.partial({
    categoryFullName: CategoryCodec,
    dateAwarded: t.string,
    prizeStatus: t.string,
    topMotivation: LocalizedTextCodec,
    laureates: t.array(NobelLaureateCodec),
  }),
])

export const NobelApiResponseCodec = t.type({
  nobelPrizes: t.array(NobelPrizeCodec),
})

export const LaureateApiResponseCodec = t.type({
  laureates: t.array(LaureateDetailsCodec),
})