import { generate } from '../utils/graphql'

export const ListSessions = generate<
  {
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    sessions: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListSessions',
  query: `
    query ListSessions($options: FilterOptions) {
      sessions: ListSessions(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})