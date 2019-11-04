import { generate } from '../utils/graphql'

export const RefreshCredential = generate<
  {
    id: string
    value: {
      code: string
    }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
      email?: string
    }
  }
>({
  name: 'RefreshCredential',
  query: `
    mutation RefreshCredential($id: String!, $value: RefreshCredentialValue!) {
      credential: RefreshCredential(id: $id, value: $value) {
        id
        created
        updated
        meta
        token
        email
      }
    }
  `,
})