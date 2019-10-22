import { generate } from '../utils/generate'

export const ListMemberships = generate<
  {
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    memberships: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListMemberships',
  query: `
    query ListMemberships($options: OptionsList) {
      memberships: ListMemberships(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
