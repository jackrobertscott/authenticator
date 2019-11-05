import { createUseServer } from '../hooks/useServer'

export const useListProviders = createUseServer<
  {
    options?:
      | object
      | {
          limit?: number
          skip?: number
          sort?: string
          reverse?: boolean
        }
  },
  {
    providers: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListProviders',
  query: `
    query ListProviders($options: FilterOptions) {
      providers: ListProviders(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
